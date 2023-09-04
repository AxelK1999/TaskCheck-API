
const { verifyToken } = require('../helpers/generateToken')
const userModel = require('../models/users')


// Refiere a permisos para el uso de rutas especificas(+ capa de seguridad) => requiere que se especifique los permisos mediante un array al injectarlo a la ruta
// Si el usuario tiene los permisos => este estara cargado en la BD (Ej : Modo administrador --> tambien debe estar contemplado en BD para mayor seg).

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.cookies.session;   //req.headers.authorization.split(' ').pop() //TODO: 231231321
        const tokenData = await verifyToken(token);
        //TODO: ver findById : 
        const userData = await userModel.findById(tokenData.id);

        //TODO ['user'].includes('user')
        if ([].concat(roles).includes(userData.role)) { //TODO: pasa los roles a un array concadenando y con el metodo includes verifica si ese rol se encuentra incluido en el array
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'A ocurrido un problema !' });
    }

}

module.exports = checkRoleAuth