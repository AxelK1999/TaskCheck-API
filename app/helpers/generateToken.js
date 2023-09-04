const jwt = require('jsonwebtoken') //TODO : 😎


const tokenSign = async (user) => { //TODO: Genera Token
   
    return jwt.sign(
        //TODO: Parametro(1)-> Payload (datos) ! Carga útil:
        {
            id: user.id,
            email: user.email 
            //role: user.role
        },
        //Parametro(2)-> Secret key/token :
        "keySecret"/*process.env.JWT_SECRET*/, //TODO ENV 
        //Parametro(3)-> Options/configs or Callback function (optional, will run in async mode if you provide this):
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, "keySecret"/*process.env.JWT_SECRET*/)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }