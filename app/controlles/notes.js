const modelUser = require("../models/UserJson.js");
const url = require("url");

const { verifyToken } = require('../helpers/generateToken.js')
const { httpError } = require('../helpers/handleError.js')

//MongoDB : 



//Archivo JSON : 

const getNotesOwner = async function(req, res){
   
   try{

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)

      let data = modelUser.readData();
      let indexes = getIndexes( {email:tokenData.email}, data );

      res.setHeader('Content-Type', 'application/json');
      
      if(indexes.object !== -1 && indexes.object !== undefined){
         const dataOwner = data[indexes.object];
         res.status(200).json( {"result": true, "data": dataOwner});
      }else{
         res.status(404).json( {"result": false, "data": null} );
      }

   } catch (e) {
      httpError(res, e)
   }
   
}
//datosReq = {workSpaceName, idSection, posSection (opc), idCard}
const getIndexes = function(datosReq, data){

   let indexObject = undefined;
   let indexSpace = undefined;
   let indexSection = undefined;
   let indexCard = undefined;

   if(datosReq.email && data){
      indexObject = data.findIndex(element => element.owner.email === datosReq.email);
   }else if(datosReq.id && data){
      indexObject = data.findIndex(element => element.owner.id === datosReq.id);
   }

   if(indexObject !== undefined && indexObject !== -1){
      indexSpace = data[indexObject].WorkSpaces.findIndex(space => space.name === datosReq.workSpaceName);
   }

   if(datosReq.posSection && indexSpace !== undefined && indexSpace !== -1){
      if(data[indexObject].WorkSpaces[indexSpace].sections[datosReq.posSection].idSection === datosReq.idSection){
         indexSection = datosReq.posSection;
      }
   }else if(indexSpace !== undefined && indexSpace !== -1 ){
      let sections = data[indexObject].WorkSpaces[indexSpace].sections;
      indexSection = sections.findIndex(s => s.idSection === datosReq.idSection);
   }

   if(indexSection !== undefined && indexSection !== -1){
      let cards = data[indexObject].WorkSpaces[indexSpace].sections[indexSection].cards;
      indexCard = cards.findIndex(c => c.id === datosReq.idCard);
   }else{
      indexCard = -1;
   }

   return {object : indexObject, space : indexSpace, section : indexSection, card : indexCard};

}

//TODO : += workSpaceName --> pensado para futura funcionalidad de multiples workSpaces x user
//datosReq = {idSection, posSection (opc), idCard, card} 
const updateCard = async function(req, res){
   
   try{
      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = {
                                 email : tokenData.email,
                                 workSpaceName : "WorkSpace", 
                                 idSection : datosReq.idSection, 
                                 posSection : datosReq.posSection, 
                                 idCard : datosReq.idCard
                              }

      let data = modelUser.readData();

      let indexes = getIndexes(dataForGetIndexes, data);
      
      let result;
      console.log(indexes);
      if(indexes.card !== -1 && indexes.card !== undefined &&
         indexes.section !== undefined && indexes.section !== -1 &&
         indexes.space !== undefined && indexes.space !== -1 &&
         indexes.object !== -1 && indexes.object !== undefined)
      {

         let card = req.body.card;

         if(card){
            card.posicion = data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards[indexes.card].posicion; //Por seguridad, la posicion debe ser cambiada por el metodo correspondiente
            card.id = data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards[indexes.card].id;
            data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards[indexes.card] = card;
            result = modelUser.writeData(data);
         }

      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }

      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e);
   }
}

//datosReq = {idSection, posSection (opc), card}
const addCard = async function(req, res){
   try{
      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = {
                                 email : tokenData.email,
                                 workSpaceName : "WorkSpace", 
                                 idSection : datosReq.idSection, 
                                 posSection : datosReq.posSection
                              }

      let data = modelUser.readData();

      let indexes = getIndexes(dataForGetIndexes, data);

      if(indexes.section !== undefined && indexes.section !== -1){

         let maxId = findLargestId(data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards);
         datosReq.card.id = maxId + 1;
         datosReq.card.posicion = data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards.length;
         data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards.push(datosReq.card);
         result = modelUser.writeData(data);
      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }

      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }
}

function findLargestId(objectsArray) {

   let largestId = -1;
   
   for (let obj of objectsArray) {
       if (obj.id > largestId) {
           largestId = obj.id;
       }
   }
   
   return largestId;
}

//datosReq = {idSection, posSection (opc), idCard}
const deletCard = async function(req, res){
   try{

      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = {
                                 email : tokenData.email,
                                 workSpaceName : "WorkSpace", 
                                 idSection : datosReq.idSection, 
                                 posSection : datosReq.posSection,
                                 idCard : datosReq.idCard
                              }

      let data = modelUser.readData();

      let indexes = getIndexes(dataForGetIndexes, data);

      if(indexes.card !== undefined && indexes.card !== -1){
         data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards.splice(indexes.card, 1);
         result = modelUser.writeData(data);
      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }

}

//datosReq = {idSection, posSection (opc), idCard1,idCard2}
const exchangePositionCard = async function(req, res){
   try{

      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = {
                                 email : tokenData.email,
                                 workSpaceName : "WorkSpace", 
                                 idSection : datosReq.idSection, 
                                 posSection : datosReq.posSection,
                                 idCard : datosReq.idCard1
                              }

      let data = modelUser.readData();

      let indexes1 = getIndexes(dataForGetIndexes, data);

      dataForGetIndexes.idCard = datosReq.idCard2;
      let indexes2 = getIndexes(dataForGetIndexes, data);

      if(indexes1.card !== undefined && indexes1.card !== -1 && 
         indexes2.card !== undefined && indexes2.card !== -1){

         let card1 = data[indexes1.object].WorkSpaces[indexes1.space].sections[indexes1.section].cards[indexes1.card];
         let card2 = data[indexes2.object].WorkSpaces[indexes2.space].sections[indexes2.section].cards[indexes2.card];
         
         let auxPosition = card1.posicion;
         card1.posicion = card2.posicion;
         card2.posicion = auxPosition;

         data[indexes1.object].WorkSpaces[indexes1.space].sections[indexes1.section].cards[indexes1.card] = card2
         data[indexes2.object].WorkSpaces[indexes2.space].sections[indexes2.section].cards[indexes2.card] = card1

         result = modelUser.writeData(data);
      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }


}

//datosReq = {idSection, idCard, idSectionToPassCard}
const changeSectionCard = async (req, res) =>{
   try{

      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = {
                                 email : tokenData.email,
                                 workSpaceName : "WorkSpace", 
                                 idSection : datosReq.idSection, 
                                 idCard : datosReq.idCard
                              }

      let data = modelUser.readData();

      let indexes = getIndexes(dataForGetIndexes, data);

      dataForGetIndexes.idSection = datosReq.idSectionToPassCard;
      dataForGetIndexes.idCard = undefined;
      let indexToSectionToPassCard = getIndexes(dataForGetIndexes, data);

      if( indexToSectionToPassCard.section !== -1 && indexToSectionToPassCard.section !== undefined &&
         indexes.card !== -1 && indexes.card !== undefined  ){

         let cardToMove = data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards[indexes.card];
         data[indexes.object].WorkSpaces[indexes.space].sections[indexes.section].cards.splice(indexes.card, 1);
         data[indexToSectionToPassCard.object].WorkSpaces[indexToSectionToPassCard.space].sections[indexToSectionToPassCard.section].cards.push(cardToMove);
   
         result = modelUser.writeData(data);
      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }
         
      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }
 
}

const addSection = async(req, res) => {
   try{

      const query = url.parse(req.url, true).query; //const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = { email : tokenData.email, workSpaceName : "WorkSpace"}

      let data = modelUser.readData();

      let indexes = getIndexes(dataForGetIndexes, data);

      let result;

      if(indexes.space !== -1 && indexes.space !== undefined){
         
         let maxID = findLargestIdSection(data[indexes.object].WorkSpaces[indexes.space].sections);
         let nroSections = data[indexes.object].WorkSpaces[indexes.space].sections.length;

         let newSection = {
            "posicion": nroSections,
            "idSection": maxID + 1,
            "title": query.name ? query.name : "New Section",
            "cards": [
            {
               "posicion": 0,
               "id": 1,
               "title": "Soy un card de pendientes",
               "note": "",
               "checksList": []
               }
            ]
         }

         data[indexes.object].WorkSpaces[indexes.space].sections.push(newSection);

         result = modelUser.writeData(data);

      }else{
         result = false;
      }
      
      if(result){
         res.status(200);
      }else{
         res.status(400);
      }
      
      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }


}

function findLargestIdSection(objectsArray) {

   let largestId = -1;
   
   for (let obj of objectsArray) {
       if (obj.idSection > largestId) {
           largestId = obj.idSection;
       }
   }
   
   return largestId;
}
//datosReq = {idSection}
const deleteSection = async(req, res) => {
   try{

      const datosReq = req.body;

      const token = req.cookies.session; 
      const tokenData = await verifyToken(token)
   
      const dataForGetIndexes = { email : tokenData.email, workSpaceName : "WorkSpace", idSection : datosReq.idSection}

      let data = modelUser.readData();
      let indexes = getIndexes(dataForGetIndexes, data);
      result = false;

      if(indexes.section !== -1 && indexes.section !== undefined){

         data[indexes.object].WorkSpaces[indexes.space].sections.splice(indexes.section,1);
         result = modelUser.writeData(data);

      }else{
         result = false;
      }

      if(result){
         res.status(200);
      }else{
         res.status(400);
      }
         
      res.setHeader('Content-Type', 'application/json');
      res.json({"result": result});

   } catch (e) {
      httpError(res, e)
   }


}

//const changePositionSection = async(req, res) => {}

// Un espacio de trabajo por usuario (posibilidad de exteneder a mas espacios de trabajo x usuario pero funciones no contempladas)
module.exports = {getNotesOwner, updateCard, addCard, deletCard, exchangePositionCard, changeSectionCard, addSection,deleteSection};