const fs = require('fs');

class User{

    static jsonFilePath = 'app/BD_JSON/notas.json';

    static async findUser(email){
        try {
            const data = await fs.promises.readFile( User.jsonFilePath , 'utf8');
            const objeto = JSON.parse(data);
    
            for(let i=0; i < [].concat(objeto).length; i++){
                if(objeto[i].owner.email === email){
                    return objeto[i].owner;
                }
            } 
            
        } catch (error) {
            console.error(error);
            return;
        }
    }

    static findDataByEmail(email) {
        try {

            const data = JSON.parse(fs.readFileSync( User.jsonFilePath, 'utf8'));
            const matchingData = data.filter(entry => entry.owner.email === email);

            return matchingData;

        } catch (error) {
            console.error(error);
            return;
        }

    }

    static writeData(data) {
        try {

          fs.writeFileSync( User.jsonFilePath , JSON.stringify(data, null, 2), 'utf8');
          console.log('Datos guardados exitosamente.');
          return true;

        } catch (error) {
          console.error('Error al escribir en el archivo JSON:', error);
          return false;
        }
    }

    static readData(){
        try {

          return JSON.parse(  fs.readFileSync( User.jsonFilePath, 'utf8')  );

        } catch (error) {
            console.error(error);
            return;
        }
    }

    static findIndexDataByIdOwner(id){
      let data = User.readData();
      return data.findIndex(element => element.owner._id === id);
    }

    static findIndexDataByEmailOwner(email){
      let data = User.readData();
      return data.findIndex(element => element.owner.email === email);
    }
}

module.exports = User;