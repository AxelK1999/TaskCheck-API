/* Requiere de boostrap para poder funcionar los componentes */

function addCheckItem(checkList) {
  checkList.appendChild( createCheckItem("Insert meta ..", "icons/trash3-fill.svg", checkList.children.length + 1) );
}

function createCheckItem(text = ' ', deleteIconPath, key, classFind = "check-item"){

    var componentHTML = `
      <div class="form-check mt-2 ${classFind}" key="${key}" deleted="false" change="false">
        <input class="form-check-input mt-2" type="checkbox" id="tareaCheck">
        <div class="btn-group">
          <textarea class="form-control" id="taskText" rows="1" cols="40">${text}</textarea>
          <button type="button" class="btn btn-danger btn-delete">
            <img src="${deleteIconPath}" height="18px">
          </button>
        </div>
      </div>
    `;

    // Crear un elemento contenedor y establecer su contenido HTML
    var contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;

    // Obtener el componente raíz del contenedor
    var componente = contenedor.firstElementChild;

    //Establecemos eventos que tendra nuestro componente
    let btnDeleteList = componente.querySelector(".btn-delete");
    btnDeleteList.addEventListener("click", function(){ 
  
        componente.setAttribute("deleted", true);
        componente.style.display = "none";
  
    });

    let taskText = componente.querySelector("#taskText");
    taskText.addEventListener("change", function(){
        console.log("editado"); 
        componente.setAttribute("change", true);
       
    });


    return componente;

}

function addCheckList(keySeccion, keyCard){
  
  const ContainerCheckList = document.querySelector(`.seccion[key='${keySeccion}'] .card[key='${keyCard}'] .Container-Check-list`);
  const keyCheckList = ContainerCheckList.querySelectorAll(".check-list").length + 1;
  ContainerCheckList.appendChild( createCheckList("Insert Title (click)" , keyCheckList  , "check-list" , `.seccion[key='${keySeccion}'] .card[key='${keyCard}'] .Container-Check-list .check-list[key='${keyCheckList}'] .container-item-check` ) );
  
}

function createCheckList(tituloCickList, key, classFind){
 
   // Crear el componente HTML utilizando plantillas de cadena de texto
  var componentHTML = `
      <div class="form-control mb-3 rounded shadow-sm ${classFind}" key="${key}" id ="1_2_1" deleted="false" change="false">
        <h6 style="display: inline-block;" class="title-check-list" contenteditable="true">${tituloCickList}</h6>

        <div class="container-item-check"></div>

        <a class="text-decoration-none mx-5 me-5 btn-add-check">Check +</a>
        <a class="text-decoration-none mx-5 btn-delete">Delete check list</a>
      </div>
  `;

  // Crear un elemento contenedor y establecer su contenido HTML
  var contenedor = document.createElement('div');
  contenedor.innerHTML = componentHTML;

  // Obtener el componente raíz del contenedor
  let componente = contenedor.firstElementChild;

  //--------------------------------------------

  //Establecemos eventos 
  let btnAddCheck = componente.querySelector(".btn-add-check");
  let containerChecks = componente.querySelector(".container-item-check");

  btnAddCheck.addEventListener("click", function(){ 
    addCheckItem(containerChecks); 
  });


  let btnDeleteList = componente.querySelector(".btn-delete");
  btnDeleteList.addEventListener("click", function(){ 

      componente.setAttribute("deleted", true);
      componente.style.display = "none";

  });

  let titleCheckList = componente.querySelector(".title-check-list");
 
  titleCheckList.addEventListener("change", function(){ 
      componente.setAttribute("change", true);
      console.log("se a realizado una modificacion");
  });

  //Componente completamente creado e independiente
  return componente;

}


function headerModal(titulo, editable = false){

  return '<div class="modal-header">'+
  '<h5 class="modal-title" contenteditable="'+editable+'">'+titulo+'</h5>'+
  '<button type="button" class="btn-close" aria-label="Close"></button>'+
  '</div>';

}

function bodyModalcheckList(){

}

function footerModal(){

}


function newTarjeta(){
    
}

function cardNote(){

}