const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign , verifyToken} = require('../helpers/generateToken')

const UserJSON = require("../models/UserJson.js");
const UserMongo = require('../models/UserMongo.js');

const loginJSON = async (req, res) => {
    try {
   
        const { email, password } = req.body
       
        const user = await UserJSON.findUser(email);        
    
        if (!user || !password) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password);// verifica si contraseña concide con la encriptada 
     
        // JWT
        const tokenSession = await tokenSign(user); 

        if (checkPassword) {
           
            //Cliente guarda la cookie automaticamnte --> enviada en posteriores solicitudes automaticamnete mientras la cookie este viva (req.cookies.nameCookie)
            res.cookie("session",tokenSession, {
                httpOnly: true,//indica si la cookie puede ser utilizada sólo por métodos http/s => no por extensiones o por codigo en el navegador por el cliente
                secure: false/*process.env.NODE_ENV === "production"*/,//indicar si se quiere que una cookie sólo pueda ser utilizada en conexiones HTTPS (true).
                sameSite: "strict", //Restringir desde que dominio(pagina) se puede acceder a la cookies (stric: solo desde mismo dominio (ayuda a evitar ataques CSRF cuando la cookie contiene credenciales como este caso) - lax: cualquier dominio ) 
                maxAge: 1000 * 60 * 60,//Tiempo de vida en seg
            });

            console.log("Login realizado correctamente");
            res.status(200);
            res.redirect("/api/1.0/views/home");
          
            return;
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            });

            return;
        }

    } catch (e) {
        httpError(res, e)
    }
}

const registerJSON = async (req, res) => {
    try {
        
        const {email, password, name} = req.body

        const passwordHash = await encrypt(password) 

        let data = UserJSON.readData();
        const largID = findLargestIdOwner(data);

        const owner = {
           id : largID + 1, 
           email,
           password : passwordHash,
           name 
        }

        const Account = { owner, WorkSpaces : [ 
                    {
                        "name": "WorkSpace",
                        "sections":[]
                    }
                ]
            }

        data.push(Account);
        let status;
        
        let result = UserJSON.writeData(data);
        //TODO : Email de confirmacion => auntentica email
        
        if(result){ status = 200 } else { status = 500; }

        res.setHeader('Content-Type', 'application/json');
        res.status(status).json({"result" : result});
      

    } catch (e) {
        httpError(res, e)
    }
}

function findLargestIdOwner(objectsArray) { //--> en carpeta helpers

   let largestId = -1;
   
   for (let obj of objectsArray) {
    console.log("----->",obj.owner);
       if (obj.owner.id > largestId) {
           largestId = obj.owner.id;
       }
    }
    return largestId;
}

const loginMongo = async (req, res) => {
    try {
   
        const { email, password } = req.body
        
        const user = await UserMongo.findOne({"owner.email" : email}, "owner");        
        
        if (!user || user === null || !password) {
            res.status(404)
            res.send({ error: 'User not found' })
        }
        
        
        let userLogin = { id: user._id , email : user.owner.email} 
        
        console.log(userLogin);

        const checkPassword = await compare(password, user.owner.password);// verifica si contraseña concide con la encriptada 

        // JWT
        const tokenSession = await tokenSign(userLogin);
        const tokenData = await verifyToken(tokenSession);
        console.log("-------->>> : ",tokenData);

        if (checkPassword) {
           
            //Cliente guarda la cookie automaticamnte --> enviada en posteriores solicitudes automaticamnete mientras la cookie este viva (req.cookies.nameCookie)
            res.cookie("session",tokenSession, {
                httpOnly: true,//indica si la cookie puede ser utilizada sólo por métodos http/s => no por extensiones o por codigo en el navegador por el cliente
                secure: false/*process.env.NODE_ENV === "production"*/,//indicar si se quiere que una cookie sólo pueda ser utilizada en conexiones HTTPS (true).
                sameSite: "strict", //Restringir desde que dominio(pagina) se puede acceder a la cookies (stric: solo desde mismo dominio (ayuda a evitar ataques CSRF cuando la cookie contiene credenciales como este caso) - lax: cualquier dominio ) 
                maxAge: 1000 * 60 * 60,//Tiempo de vida en seg
            });

            console.log("Login realizado correctamente : TOKEN -> ",tokenSession);

            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.status(201).json({"result" : true, "inf" : "Login realizado con exito"});
            //res.redirect("/api/1.0/views/home");
          
            return;
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            });

            return;
        }

    } catch (e) {
        httpError(res, e)
    }
}

const registerMongo = async (req, res) => {
    try {
        
        const {email, password, name} = req.body

        const passwordHash = await encrypt(password) 

        const owner = {
           email,
           password : passwordHash,
           name 
        }

        const Account = { owner, WorkSpaces : [ 
                    {
                        "name": "WorkSpace",
                        "sections":[]
                    }
                ]
            }
    
        let existsUser = await UserMongo.exists({"owner.email" : owner.email});

        res.setHeader('Content-Type', 'application/json');

        if(!existsUser){

            let user = new UserMongo(Account);
            await user.save();
            
            res.status(201).json({"result" : true, "inf" : "Usuario registrado correctamente"});        
            //TODO : Email de confirmacion => auntentica email
            
        }else{
            res.status(400).json({"result" : false, "inf": "Usuario ya registrado"});
        }
      
    } catch (e) {
        httpError(res, e)
    }
}

function logout(req, res) {
    res.cookie('session', '', { expires: new Date(-150) });
  }

module.exports = { registerMongo, loginMongo, registerJSON, loginJSON, logout }