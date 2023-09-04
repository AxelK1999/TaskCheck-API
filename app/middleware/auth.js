
const { verifyToken } = require('../helpers/generateToken')
const rateLimit = require('express-rate-limit');

const checkAuth = async(req, res, next) =>{
    try {
        
        const token = req.cookies.session; 
        const tokenData = await verifyToken(token);

        console.log("Token a verificar para autenticacion ---> ",token);
        if (tokenData && tokenData.id) {
            next();
        } else {
            
            res.redirect("/api/1.0/views/login");

            //res.status(409);
            //res.send({ error: 'Tu por aqui no pasas!' });
        }

    } catch (e) {
        console.log(e);
        res.status(401);
        res.send({ error: 'Tu no estas autenticado' });
    }

}

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // Intervalo de tiempo en "ms" en este caso 10 minutos para volver a permitir solicitudes
    max: 5, // 5 intentos máximos
    message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente en 10 minutos',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

module.exports = {checkAuth, rateLimit}