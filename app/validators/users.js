const { check } = require('express-validator'); 
const { validateResult } = require('../helpers/validateHelper');
const User = require("../models/UserJson.js");
const { encrypt, compare } = require('../helpers/handleBcrypt');


const validateOwner = [ //TODO:name, age, email
    check('name')
        .exists()
        .isString()
        .trim() // Elimina espacios en blanco al principio y al final del string
        .notEmpty()
        .escape(),//TODO: crear validaccion exclusiva para la sanitización de datos / Asegurarlo en el Front
    /* check('dni')
        .exists()
        .isInt(), */
    check('email')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isString()
        .isLength({ min: 5 }),
    check('newPassword')
        .optional()
        .isString()
        .isLength({ min: 5 }),
        
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const modelUser = require("../models/UserJson.js");
const { httpError } = require('../helpers/handleError');

const validateUserExistenceForCreate = (req, res, next) =>{

    try{

        let indexOwner =  modelUser.readData().findIndex( element => element.owner.email === req.body.email || element.owner.id === req.body.dni );
    
        if(indexOwner === -1){
            next();
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json({result : false ,inf : "Existing user !! "});
        }
    }catch(e){
        httpError(res, e);
    }

}

const validateAuthPassword = async (req, res, next) =>{
    
    try{
        const { password, newPassword, email } = req.body

        res.setHeader('Content-Type', 'application/json');

        const user = await User.findUser(email);        
    
        if (!user) {
            res.status(400)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password);

        if(checkPassword) {

            if(newPassword){
                req.body.password = await encrypt(newPassword);
            }

            next();

        }else{
            res.status(400).json({result : false });
        }


    }catch(e){
        httpError(res, e);
    }

}

module.exports = { validateOwner , validateUserExistenceForCreate, validateAuthPassword}