# Proyecto: Api Task Check

**Descripcion :** 
Consiste en una api que permite administrar notas y listas de tareas a realizar de ususarios registrados previemente, estas estan organizadas dentro de un espacio de trabajo que posee cada ususario, esta compuesta por secciones (creadas y tituladas por el usuaruio) que contienen tarjetas, cada una de ellas con notas y listas de tareas correspondientes a la vinculadas y creadas para el cumplimiento de la actividad que represente esa tarjeta en particular. 

La misma presenta una version que contiene como base de datos un archivo JSON [url + "J"] y otra como base de datos a MongoDB [url + "M"].  

## Caracterisitcas 

- Registro y auntenticacion de usuarios.
- Registro, actualizacion y consulta de notas y pendientes.
- Gestion y posicionamiento de secciones y tarjetas.
- Validacion y control de datos de entrada.
- Encriptacion de activos criticos (password).

## Tecnologias Utilizadas
- **Node y express**
- **Base de datos : MongoDB** 
- **Boostrap 5**

## Arquitectura y patron de carpetas: 
- Utilizacion de arquitecutra **MVC**
- Utilizacion de arquitectura **REST** para el manejo de las rutas
- Patron de organizacion de carpetas :
    - Validators : se almacenan funciones encargadas de validar datos de entrada antes de que se procesen o almacenen en la base de datos. 
    - Middleware : se almacenan funciones de middleware que se utilizan para procesar solicitudes HTTP antes de que lleguen a las rutas o controladores finales. 
    - Helpers : funciones auxiliares o utilidades que se utilizan en varias partes de la aplicación.
    - Config : se almacena la configuración de la aplicación (configuraciones de bases de datos, opciones de autenticación, etc.).
    - Modelo : esquemas y modelos de datos utilizados en la aplicación. 
    - Vista
    - Controlador
    - Routes : rutas especifican qué controlador y función de controlador deben ejecutarse cuando se recibe una solicitud en una URL específica. 

## Intalacion y configuracion
- Instalar Node.js : https://nodejs.org
- Clonar proyecto del repositiorio : `git clone https://github.com/AxelK1999/TaskCheck-API.git`
- Estando posicionado en la carpeta del proyecto previamente clonado, en la terminal:
    1. Insatalacion de dependencias: ` npm i -D `
    2. Correr el proyecto modo desarrollo: `npm run dev` o modo produccion `npm start`

## Uso 

Las peticiones pueden realizarse en extensiones como Thunder o Postman, a los controladores:

GET `http://localhost:3000/api/1.0/notes`
PUT `http://localhost:3000/api/1.0/notes/card`
POST `http://localhost:3000/api/1.0/notes/card`
DELETE `http://localhost:3000/api/1.0/notes/card`

**..........** 

Que se encuentran en : `app/routes/notes.js` y `app/routes/users.js` sin embargo se presenta la siguiente alternativa para poder probar: 

###### Base de datos JSON :

    Registro de cuenta :
        En el proyecto acceder y modificar/definir su datos de cuenta : app/views/request_Api/register.html .
        Acceder a : http://localhost:3000/api/1.0/views/register para impactar el mismo .

    Login :
        Ingresar los datos de su cuenta en : http://localhost:3000/api/1.0/views/login proceso correcto al otorgarle accceso al "http://localhost:3000/api/1.0/views/home" .

    User(owner):
        Para actualizar/editar datos del usuario acceder y definirlos en "app/views/request_Api/updateUser.html" y acceder a http://localhost:3000/api/1.0/views/updateUser .
        Para leer los datos de usuario acceder a http://localhost:3000/api/1.0/users/J .

    Seccion(section) :
        Para crear acceder a http://localhost:3000/api/1.0/notes/createSection .
        Para borrar una seccion definir el Id(nro) de la seccion a borrar en "app/views/request_Api/deleteSection.html" y acceder a http://localhost:3000/api/1.0/views/deleteSection .  

    Taerjeta(card) : 
        Para crear acceder y definir los datos de la tarjeta en "app/views/request_Api/addCard.html" y acceder a http://localhost:3000/api/1.0/views/addCard .
        Para borrar definir el Id(nro) de la seccion y id de la tarjeta a borrar en "app/views/request_Api/deleteCard.html" y acceder a http://localhost:3000/api/1.0/views/deleteCard .
        Para editar acceder y definir los datos de la tarjeta en "app/views/request_Api/updateCard.html" y acceder a http://localhost:3000/api/1.0/views/updateCard .
        Para visualizar las notas acceder a http://localhost:3000/api/1.0/notes . 
    
    Intercambio de posicion :
        Para intercambiar Cards definir y acceder a "app/views/request_Api/changePositionCard.html" y acceder a http://localhost:3000/api/1.0/views/exchangePositionCard .
        Para intercambiar Sections definir y acceder a "app/views/request_Api/changeSectionCard.html" y acceder a http://localhost:3000/api/1.0/views/changeSectionCard .

###### Base de datos Mongo DB :

    Registro de cuenta :
        En el proyecto acceder y modificar/definir su datos de cuenta : app/views/request_Api/registerMongo.html .
        Acceder a : http://localhost:3000/api/1.0/views/registerM para impactar el mismo .

    Login :
        Ingresar los datos de su cuenta en : app/views/request_Api/loginMongo.html  y acceder a "http://localhost:3000/api/1.0/views/loginM" se informara en consola resultado de operacion.

    User(owner):
        Para actualizar/editar datos del usuario acceder y definirlos en "app/views/request_Api/updateUserMongo.html" y acceder a http://localhost:3000/api/1.0/views/updateUserM .
        Para leer los datos de usuario acceder a http://localhost:3000/api/1.0/users/M .
-------
## UI (pendiente) : 

![Alt text](/esquema%20y%20diseño/image.png)
