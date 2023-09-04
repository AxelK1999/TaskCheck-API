const { httpError } = require('../helpers/handleError');

const pathBase = __dirname.replace(/\\/g, '/').replace("/app/controlles","");

const login = (req, res) => {
    try{
        
      /*   let pathLogin = __dirname.replace(/\\/g, '/');
        pathLogin = pathLogin.replace("/app/controlles","/app/views/login.html"); */

        res.sendFile(pathBase + "/app/views/login.html");

    } catch (e) {
        httpError(res, e);
    }
}


const home = (req, res) =>{
    try{ 

        res.sendFile(pathBase + "/app/views/home.html");
        //res.send({cook: req.cookies.session, hi:"hola"});

    } catch (e) {
        httpError(res, e);
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------

//------------ ""Para consumir/probar API(metodos POST-PUT)"" [Uso equivalente a postman/Thunder/Rest client] => a ser borrado para produccion ---------------

//******************** Archivo JSON como BD *************************/
const updateCard = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/updateCard.html"); 

    } catch (e) {
        httpError(res, e);
    }
}

const addCard = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/addCard.html");
     
    } catch (e) {
        httpError(res, e);
    }
}

const deleteCard = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/deleteCard.html");
     
    } catch (e) {
        httpError(res, e);
    }
}

const changePositionCard = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/changePositionCard.html");
      
    } catch (e) {
        httpError(res, e);
    }
}

const changeSectionCard = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/changeSectionCard.html");
        
    } catch (e) {
        httpError(res, e);
    }
}
const deleteSection = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/deleteSection.html");
        
    } catch (e) {
        httpError(res, e);
    }
}

const register = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/controlles","/app/views/request_Api/register.html");
        
    } catch (e) {
        httpError(res, e);
    }
}

const updateUser = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/updateUser.html");
        
    } catch (e) {
        httpError(res, e);
    }
}

//******************** Mongo como BD *************************/

const loginM = (req, res) => {
    try{
        
        res.sendFile(pathBase + "/app/views/request_Api/loginMongo.html");

    } catch (e) {
        httpError(res, e);
    }
}

const registerM = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/registerMongo.html");
    
    } catch (e) {
        httpError(res, e);
    }
}

const updateUserM = (req, res)=> {
    try{ 

        res.sendFile(pathBase + "/app/views/request_Api/updateUserMongo.html");
        
    } catch (e) {
        httpError(res, e);
    }
}

//--------------------------------------------

module.exports = {login, home, register, updateUser, updateCard, addCard, deleteCard, changePositionCard, changeSectionCard, deleteSection,  loginM, registerM, updateUserM }