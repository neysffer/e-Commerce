//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const myDataBase = JSON.parse(localStorage.getItem("Base_DATOS"));

/* let imgConst = myDataBase[0].img; */


document.addEventListener("DOMContentLoaded", function (e) {
  
    document.getElementById("changeUserName").innerHTML = (myDataBase)[0].name;
    /* document.getElementById("changeEmail").innerHTML = (myDataBase)[0].email; */
    document.getElementById("changePlaceHolderEmail").placeholder = (myDataBase)[0].email;

    document.getElementById("changePhone").placeholder = (myDataBase)[0].phone;

    document.getElementById("changeName").innerHTML = (myDataBase)[0].user + " " + (myDataBase)[0].lastNam;

    document.getElementById("changeIMG").innerHTML = ` <img class="rounded-circle mt-5" width="150px" src="` + myDataBase[0].img +`">`

    document.getElementById("btnSaveChange").addEventListener("click", changeInfo);

    document.getElementById("imgModal").addEventListener("click", changeImage);
});


function changeInfo()
{
    const arr = [];
    let newName = document.getElementById("nameUser").value;
    let newLastname = document.getElementById("lastName").value;
    

    document.getElementById("changeName").innerHTML = newName + " " + newLastname;

    arr.push({
        "name" : myDataBase[0].name,
        "email" : myDataBase[0].email,
        "phone" : myDataBase[0].phone,
        "pass" :  myDataBase[0].pass,
        "user" : newName,
        "lastNam": newLastname,
        "img" : myDataBase[0].img,
    });

  /* console.log(arr); */
   localStorage.setItem("Base_DATOS", JSON.stringify(arr));

}


function changeImage(){
  let arre = [];
myDataBase[0].img = "/img/woman.png";

  document.getElementById("changeIMG").innerHTML = ` <img class="rounded-circle mt-5" width="150px" src="` + myDataBase[0].img +`">`

  arre.push({
    "name" : myDataBase[0].name,
    "email" : myDataBase[0].email,
    "phone" : myDataBase[0].phone,
    "pass" :  myDataBase[0].pass,
    "user" : myDataBase[0].user,
    "lastNam": myDataBase[0].lastNam,
    "img" : myDataBase[0].img,
});
  localStorage.setItem("Base_DATOS", JSON.stringify(arre));

  

  
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