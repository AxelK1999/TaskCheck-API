const express = require('express')
const router = express.Router()
const {checkAuth} = require("../middleware/auth");

const {login, home, register, updateUser, updateCard, addCard, deleteCard,changePositionCard,changeSectionCard, deleteSection,   loginM, registerM, updateUserM} = require("../controlles/views.js");

//direccion de archivos estaticos(js,css,etc) solicitaods por html respondido al cliente
router.use("/", express.static("./app/views/public"));

router.get('/login', login);

//router.use(checkAuth);  //Las solicitudes deben pasar la funcion checkAuth para las rutas declaradas a continuacion:
router.get("/home", checkAuth, home);

//.. todas las rutas que retornan una vista(interfaz grafica : html+css+js+media)

//------------ Para consumir/probar API(metodos POST-PUT) ------

router.get("/updateCard", checkAuth, updateCard);
router.get("/addCard", checkAuth, addCard);
router.get("/deleteCard", checkAuth, deleteCard);
router.get("/changePositionCard", checkAuth, changePositionCard);
router.get("/changeSectionCard", checkAuth, changeSectionCard);
router.get("/deleteSection", checkAuth, deleteSection);
router.get("/register", register);
router.get("/updateUser",checkAuth, updateUser);

//*************************MONGO**********************************/
router.get("/loginM", loginM);
router.get("/registerM", registerM);

router.get("/updateUserM", checkAuth, updateUserM);

//***************************************************************/


//-------------------------------------------------------------


module.exports = router;