const { httpError } = require('../helpers/handleError');
const { verifyToken } = require('../helpers/generateToken')
const { logout } = require('../controlles/auth.js')
const { encrypt, compare } = require('../helpers/handleBcrypt')

const modelUser = require("../models/UserJson.js");
const userMongo = require('../models/UserMongo.js');

// JSON :
const readOwnerByEmailJSON = async function(req, res){
    
  try {
      
        const token = req.cookies.session; 
        const tokenData = await verifyToken(token);
        
        const user = await modelUser.findUser(tokenData.email);

        user.password = "";

        res.setHeader('Content-Type', 'application/json');
    
        if(user){
            res.status(200).json({"result": true, user});
        }else{
            res.status(400).json({"result": false});
        }

    } catch (e) {
        httpError(res, e);
    }
}

const updateOwnerByEmailJSON = async function(req, res){
    try{
           
        const { password, name } = req.body;
  
        const token = req.cookies.session; 
        const tokenData = await verifyToken(token)
        let lagout = false;
        
        let data = modelUser.readData();
  
        const indeUser = data.findIndex(element => element.owner.email === tokenData.email);
      
        if(data[indeUser].owner.password !== password){
          lagout = true;
        }

        data[indeUser].owner = {id :tokenData.id, email : tokenData.email, password, name };
  
        modelUser.writeData(data);

        res.status(200);

        if(lagout){
          logout(req,res);
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.json({"result": true});

     } catch (e) {
        httpError(res, e);
     }
}

// MONGO DB :

async function readOwnerByEmail(req, res) {
  try {

    const token = req.cookies.session;
    
    const tokenData = await verifyToken(token)// verifica y retorna los datos encriptados en un token
    const user = await userMongo.findOne({ '_id': tokenData.id}, "owner");
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({"result": true, "owner": user.owner});

  } catch (e) {
    console.error('Error al leer el Owner:', e);
    httpError(res, e);
  }
}

async function updateOwnerByEmail(req, res) {
  try {

    let {newPassword , password, name} = req.body;
    
    const token = req.cookies.session; 
    const tokenData = await verifyToken(token)
    

    const realPassword = await userMongo.findOne({ 'owner.email': tokenData.email }, 'owner.password');
    console.log(realPassword);
    const checkPassword = await compare(password, realPassword.owner.password);
    
    res.setHeader('Content-Type', 'application/json');
    
    if(!checkPassword){
      res.status(400).json({"result": false, "info" : "Incorrect password"});
      return;
    }

    if((newPassword || newPassword !== null) && newPassword !== password){
      password = await encrypt(newPassword);
      logout(req,res);
    }

    let updatedOwnerData = {
      password: password,
      name: name,
      email: tokenData.email
    }

    const updatedOwner = await userMongo.findOneAndUpdate(
      { 'owner.email': tokenData.email },
      { $set: { owner : updatedOwnerData } } );

      /*await userMongo.updateOne(
        { 'owner.email': email },
        { $set: { 'owner.name': 'NuevoNombre' } }
        );*/

    console.log('Owner actualizado exitosamente:');

    res.status(200).json({"result": true});

  } catch (e) {
    console.error('Error al actualizar el Owner:', e);
    httpError(res, e);
  }
}

async function deleteOwnerByEmail(req, res) {
  try {

    const token = req.cookies.session; 
    const tokenData = await verifyToken(token)

    await userMongo.findOneAndDelete({ 'owner.email': tokenData.email });
    console.log('Owner eliminado exitosamente.');

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({"result": true});

  } catch (e) {
    console.error('Error al eliminar el Owner:', e);
    httpError(res, e);
  }
}

module.exports = { updateOwnerByEmailJSON, readOwnerByEmailJSON, readOwnerByEmail, updateOwnerByEmail, deleteOwnerByEmail }