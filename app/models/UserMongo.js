const mongoose = require('mongoose');

//TODO : Remplazo de UserNotes en caso de no ser App escritorio por ejemplo y ser app web

// Definir el esquema para la tarea dentro de un check
const taskSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  task: String,
  check: Boolean
});

// Definir el esquema para un elemento de la lista de checks
const checkListSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  title: String,
  tasks: [taskSchema]
});

// Definir el esquema para una tarjeta
const cardSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  posicion: Number,
  title: String,
  note: String,
  checksList: [checkListSchema]
});

// Definir el esquema para una sección
const sectionSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  posicion: Number,
  idSection: Number,
  title: String,
  cards: [cardSchema]
});

// Definir el esquema para el modelo principal
const workspaceSchema = new mongoose.Schema({
  
  owner: {
    name: String,
    email: String,
    password: String
  },
  
  WorkSpaces: [
    {
      id : mongoose.Schema.Types.ObjectId,
      name: String,
      sections: [sectionSchema]
    }
  ]

});

// Crear el modelo basado en el esquema
const WorkspaceModel = mongoose.model('Workspace', workspaceSchema);

// Exportar el modelo
module.exports = WorkspaceModel;
