//RETURN HOMEPAGE
const returnHP = ()=>{
  window.location.href = '../menuPrincipal.html'
}





// ******************************

function validateForm() {
  let name = document.getElementById("inputPriority").value;
  let urgency = document.getElementById("selectorUrg").value;

  //Validaciones
  if (name == "") {
    alert("El nombre de la prioridad es obligatorio.");
    return false;
  }

  if (urgency == "") {
    alert("El campo Urgencia, es obligatorio.");
    return false;
  }

  return true;
}


//Lista
function readData() {
  let listPriorities;

  if (localStorage.getItem("listPriorities") == null) {
    listPriorities = [];
  } else {
    listPriorities = JSON.parse(localStorage.getItem("listPriorities"));
  }

  var html = ''

  listPriorities.forEach(function(element,index){
    html += '<tr>'
    html += '<td>'+element.name+'</td>'
    html += '<td>'+element.urgency+'</td>'
    //Botones
    html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Eliminar Prioridad</button> <button onclick="updateData('+index+')" class="btn btn-warning">Editar Prioridad</button>'
    html += '</tr>'
  });

  //Selecciona el cuerpo de la tabla correctamente
  document.querySelector('#tableData tbody').innerHTML = html
}

//Llama al readData al cargar la página
window.onload = readData()

//AGREGAR
function AddData() {
    if (validateForm() == true ) {
        let name = document.getElementById("inputPriority").value;
        let urgency = document.getElementById("selectorUrg").value;
        
        var listPriorities

        if (localStorage.getItem('listPriorities') == null) {
            listPriorities = []
        } else {
            listPriorities = JSON.parse(localStorage.getItem("listPriorities"));
        }

        listPriorities.push({
            name: name,
            urgency: urgency
        })

        localStorage.setItem('listPriorities',JSON.stringify(listPriorities))
        readData()

        //Limpieza de los campos
        document.getElementById('inputPriority').value=''
        document.getElementById('selectorUrg').value=''
    }
}

//ELIMINAR
function deleteData(index) {
  let listPriorities;

  if (localStorage.getItem("listPriorities") == null) {
    listPriorities = [];
  } else {
    listPriorities = JSON.parse(localStorage.getItem("listPriorities"));
  }

  listPriorities.splice(index,1)
  localStorage.setItem('listPriorities',JSON.stringify(listPriorities))
  readData()
}

//UPDATE
function updateData(index) {
  document.getElementById('btnSubmit').style.display = 'none'
  document.getElementById('btnUpdate').style.display = 'block'

  let listPriorities;

  if (localStorage.getItem("listPriorities") == null) {
    listPriorities = [];
  } else {
    listPriorities = JSON.parse(localStorage.getItem("listPriorities"));
  }

  //Traer los inputs
  document.getElementById('inputPriority').value = listPriorities[index].name
  document.getElementById('selectorUrg').value = listPriorities[index].urgency

  //Validar el botón update
  document.querySelector('#btnUpdate').onclick = function(){
    if (validateForm() == true) {
      listPriorities[index].name = document.getElementById('inputPriority').value
      listPriorities[index].urgency = document.getElementById('selectorUrg').value

      localStorage.setItem('listPriorities',JSON.stringify(listPriorities))
      readData()

      //Traer los inputs
      document.getElementById('inputPriority').value = ''
      document.getElementById('selectorUrg').value = ''

      document.getElementById('btnSubmit').style.display = 'block'
      document.getElementById('btnUpdate').style.display = 'none'
    }
  }
}