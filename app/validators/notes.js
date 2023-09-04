const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

//Valida que el card contenga los atibutos y valores correspondientes, y no contenga otras estrucutras:
const validateCard = [ 
    
    check('posicion').optional().isInt(),// Son ignorados por el controlador para evitar posibles conflictos => son opcinales
    check('id').optional().isInt(),// Son ignorados por el controlador => son opcinales
    
    check('card')
        .bail() //para detener la cadena de validación si la validación actual falla
        .isObject()
        .custom((card, { req }) => {
            //validacion personalizada pasando el card del body de la solicitud
            const allowedCardKeys = ['title', 'note', 'checksList'];
            const unknownKeys = Object.keys(card).filter(key => !allowedCardKeys.includes(key));
            
            if (unknownKeys.length > 0) {
                throw new Error(`Atributos desconocidos en card: ${unknownKeys.join(', ')}`);
            }
            
            return true;
        }),
    check('card.title')
        .isString()
        .escape(),//TODO: crear validaccion exclusiva para la sanitización de datos / Asegurarlo en el Front
    check('card.note').isString(),
    check('card.checksList')
        .isArray()
        .custom((checksList, { req }) => {
            for (const item of checksList) {

                if (typeof item !== 'object') {
                    throw new Error(`El elemento en checksList no es un objeto`);
                }
                
                const unknownKeys = Object.keys(item).filter(key => !['title', 'tasks'].includes(key));
                if (unknownKeys.length > 0) {
                    throw new Error(`Atributos desconocidos en checksList item: ${unknownKeys.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('card.checksList.*.title')
        .isString()
        .escape(),
    check('card.checksList.*.tasks')
        .isArray()
        .custom((tasks, { req }) => {
            for (const task of tasks) {
                if (typeof task !== 'object') {
                    throw new Error(`El elemento en tasks no es un objeto`);
                }

                const unknownKeys = Object.keys(task).filter(key => !['task', 'check'].includes(key));
                if (unknownKeys.length > 0) {
                    throw new Error(`Atributos desconocidos en tasks item: ${unknownKeys.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('card.checksList.*.tasks.*.task').isString().escape(),
    check('card.checksList.*.tasks.*.check').isBoolean(),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
    
]

module.exports = { validateCard }