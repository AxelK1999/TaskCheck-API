const express = require('express')
const router = express.Router()
//const checkOrigin = require('../middleware/origin')
const {checkAuth} = require('../middleware/auth')
//const checkRoleAuth = require('../middleware/roleAuth')
const { readOwnerByEmailJSON, updateOwnerByEmailJSON , readOwnerByEmail, updateOwnerByEmail } = require("../controlles/users.js");
const { validateOwner,  validateAuthPassword } = require('../validators/users')

//RUTAS MONGO DB:
    router.get('/M', checkAuth, readOwnerByEmail);
    router.put('/M', checkAuth, validateOwner, updateOwnerByEmail);

    
//RUTAS Archivo JSON:
    router.get('/J', checkAuth, /*checkRoleAuth(['admin']),*/readOwnerByEmailJSON);
    router.put('/J', /*checkOrigin,*/ checkAuth, validateOwner, validateAuthPassword, updateOwnerByEmailJSON);

module.exports = router