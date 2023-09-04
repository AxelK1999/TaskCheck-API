const express = require('express')
const router = express.Router()

const {logout , registerMongo, loginMongo, registerJSON, loginJSON } = require('../controlles/auth.js')
const { validateOwner, validateUserExistenceForCreate } = require('../validators/users.js')
const checkOrigin = require('../middleware/origin.js');

//---- TODO: capturar body de req---
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//--------------

router.get('/logout', logout);

//Archive JSON DB:

router.post('/registerJ', validateOwner, validateUserExistenceForCreate, registerJSON);
router.post('/loginJ', loginJSON);


//MONGO DB :

router.post('/loginM', loginMongo);
router.post('/registerM', validateOwner, registerMongo);


module.exports = router