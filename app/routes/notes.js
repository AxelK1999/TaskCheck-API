const express = require('express')
const router = express.Router()

const {updateCard, addCard, deletCard, exchangePositionCard, changeSectionCard, addSection, deleteSection, getNotesOwner} = require("../controlles/notes.js");
const {checkAuth} = require("../middleware/auth.js");
const { validateCard } = require('../validators/notes.js')

//RUTAS Archivo JSON:
router.get("/",checkAuth, getNotesOwner);

router.put("/card",checkAuth,validateCard, updateCard);
router.post("/card",checkAuth,validateCard, addCard);
router.delete("/card",checkAuth, deletCard);

router.post("/exchangePositionCard",checkAuth, exchangePositionCard);
router.post("/changeSectionCard",checkAuth, changeSectionCard);

router.get("/createSection",checkAuth, addSection); //TODO: debe ser una post /section
router.delete("/section",checkAuth, deleteSection);

//RUTAS MONGO DB:

module.exports = router