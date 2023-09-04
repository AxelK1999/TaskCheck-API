const epxress = require('express')
const router = epxress.Router()
const fs = require('fs')

const pathRouter = `${__dirname}`;//__dirname: path del directorio donde se lo use : "C:\..\..\node-seed-api-main\app\routes"
/* 
Esta línea de código crea una variable pathRouter que se establece en el directorio actual utilizando la variable global __dirname proporcionada por Node.js.
Esta variable se utilizará para leer el contenido del directorio actual.
*/

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

/*
Esta línea de código define una función removeExtension que toma una cadena de texto fileName como entrada y devuelve una
nueva cadena de texto sin la extensión del archivo. Esto se utilizará para extraer el nombre del archivo para usarlo como ruta. 
*/

fs.readdirSync(pathRouter).filter((file) => {

    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)); //TODO: Ej: una sera "localhost/users"
        console.log('CARGAR RUTA ---->', fileWithOutExt);
    }

})

/*
Este bloque de código lee el contenido del directorio actual utilizando fs.readdirSync() y filtra cualquier archivo que tenga un nombre de index o que no tenga extensión.
Luego itera sobre los archivos restantes y utiliza router.use() para definir una nueva ruta para cada archivo.
El nombre de la ruta se deriva del nombre del archivo utilizando la función removeExtension(), y el controlador de la ruta se importa utilizando require().
Finalmente, se imprime un mensaje de registro que indica que se ha agregado una nueva ruta.
*/

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})
/*
Esta línea de código define una ruta de fallback que se utilizará si ninguna otra ruta coincide con la URL solicitada.
Establece el código de estado HTTP en 404 (No encontrado) y envía una respuesta JSON que indica que no se encontró el recurso solicitado.
*/
module.exports = router


//                                                          **** OBJETIVO ****
/*

Carga de rutas dinamicamente es decir evita tener que cargar las rutas una a una en el app.js => simplemente se debe crear una ruta en la carpeta de rutas asi como estan las demas
rutas en este proyecto.

EJ evita situaciones como esta:

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

const routerProgramacion = require('./routers/programacion.js'); 
app.use('/api/cursos/programacion', routerProgramacion);

A SER SOLO EN app.js:

app.use('/api/1.0', require('./app/routes'));

--------
=> evita codigo extenso de carga de rutas en app y lo automatiza

*/