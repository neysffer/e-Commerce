//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const name_user = JSON.parse(localStorage.getItem("Base_DATOS"));

document.addEventListener("DOMContentLoaded", function (e) {
    showUserandEmail();

    document.getElementById("btnSaveChange").addEventListener("click", changeInfo)
});

function showUserandEmail()
{
 document.getElementById("changeUserName").innerHTML = (name_user)[0].name;
 document.getElementById("changeEmail").innerHTML = (name_user)[0].email;
 document.getElementById("changeName").innerHTML = (name_user)[0].user;
  
 console.log(name_user);
}

function changeInfo()
{
    let changeName = document.getElementById("changeName");
    let newName = document.getElementById("nameUser").value;
    const arr = [];
    
    changeName.innerHTML = newName;

    arr.push({
        "name" : name_user[0].name,
        "email" : name_user[0].email,
        "phone" : name_user[0].phone,
        "pass" :  name_user[0].pass,
        "user" : newName,
    });

   localStorage.setItem("Base_DATOS", JSON.stringify(arr));

   
    console.log(arr);
    


}

/* para después */
/* function mostrar(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        document.getElementById("img").src = reader.result;
      }
    }
  }

  <input type="file" id="file" accept="image/*" onchange="mostrar()"/>
  <br>
  <img class="rounded-circle mt-5" width="200px" id="img"/> */
/* fin para después */