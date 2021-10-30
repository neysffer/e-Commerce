//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const myDataBase = JSON.parse(localStorage.getItem("Base_DATOS"));
let controlImg;
/* let imgConst = myDataBase[0].img; */
console.log(myDataBase);

document.addEventListener("DOMContentLoaded", function (e) {
  //Recorro mi almacenamiento en el local y agrego la información dependiendo de si es login o registro
  for(let i = 0; i < parseInt((myDataBase).length) ; i++)
  {
    
    document.getElementById("changeIMG").innerHTML = ` <img class="rounded-circle mt-5" width="150px" src="` + myDataBase[i].img +`">`
    
    if((myDataBase[i].email == undefined) && (myDataBase[i].phone == undefined))
    {
      document.getElementById("changeUserName").innerHTML = (myDataBase)[i].name;
      document.getElementById("changeName").innerHTML = (myDataBase)[i].user + " " + (myDataBase)[i].lastNam;
      document.getElementById("age").placeholder = (myDataBase)[i].age;

    }else{
        document.getElementById("changeUserName").innerHTML = (myDataBase)[i].name;
        /* document.getElementById("changeEmail").innerHTML = (myDataBase)[i].email; */
        document.getElementById("changePlaceHolderEmail").placeholder = (myDataBase)[i].email;

        document.getElementById("changeName").innerHTML = (myDataBase)[i].user + " " + (myDataBase)[i].lastNam;

        document.getElementById("changePhone").placeholder = (myDataBase)[i].phone;
        document.getElementById("selectNumber").options.selectedIndex = myDataBase[i].numbSelect;

        document.getElementById("age").placeholder = (myDataBase)[i].age;

      }
  }

    document.getElementById("btnSaveChange").addEventListener("click", changeInfo);

/* if() */
    document.getElementById("imgModal").addEventListener("click", function(){
      controlImg = 0;
      changeImage(controlImg);
    });
    document.getElementById("imgModal_1").addEventListener("click", function(){
      controlImg = 1;
      changeImage(controlImg);
    });
    document.getElementById("imgModal_2").addEventListener("click", function(){
      controlImg = 2;
      changeImage(controlImg);
    });
    document.getElementById("imgModal_3").addEventListener("click", function(){
      controlImg = 3;
      changeImage(controlImg);
    });
    
});


function changeInfo()
{
    const arr = [];
    let newName = document.getElementById("nameUser").value;
    let newLastname = document.getElementById("lastName").value;
    let newEmail = document.getElementById("changePlaceHolderEmail").value;
    let newPhone = document.getElementById("changePhone").value;
    let selected = document.getElementById("selectNumber");
    let selectDate = document.getElementById("dp1").value;
    let fecha1 = new Date(selectDate)
    let fecha2 = new Date();
    let resta = fecha2.getTime() - fecha1.getTime();
    let age = (Math.round(resta/ (1000*60*60*24*365)-1));
    /* let selectedNumberPhone = selected.options[selected.selectedIndex].text; */
    
    if(newName !== "" && newLastname !== "" && newEmail !== "" && newPhone !== "")
    {
      document.getElementById("changeName").innerHTML = newName + " " + newLastname;
      document.getElementById("age").placeholder = age;
      arr.push({
          "name" : myDataBase[0].name,
          "email" : newEmail,
          "phone" : newPhone,
          "numbSelect" : selected.selectedIndex,
          "pass" :  myDataBase[0].pass,
          "user" : newName,
          "lastNam": newLastname,
          "img" : myDataBase[0].img,
          "age" : age,
      });

      
      localStorage.setItem("Base_DATOS", JSON.stringify(arr));
    }else{
      alert("Llena todos los campos para continuar.")
    }

    /* 
    console.log(selected.selectedIndex); */
   

}


function changeImage(directionImg)
{
  let arre = [];
  if(directionImg == 0){
    myDataBase[0].img = "/img/woman.png";
  }else if(directionImg == 1){
    myDataBase[0].img = "/img/man.png";
  }else if(directionImg == 2){
    myDataBase[0].img = "/img/siluette_1.png";
  }else if(directionImg == 3){
    myDataBase[0].img = "/img/siluette_2.png";
  }

  document.getElementById("changeIMG").innerHTML = ` <img class="rounded-circle mt-5" width="150px" src="` + myDataBase[0].img +`">`

  arre.push({
    "name" : myDataBase[0].name,
    "email" : myDataBase[0].email,
    "phone" : myDataBase[0].phone,
    "numbSelect" : myDataBase[0].numbSelect,
    "pass" :  myDataBase[0].pass,
    "user" : myDataBase[0].user,
    "lastNam": myDataBase[0].lastNam,
    "img" : myDataBase[0].img,
});
  localStorage.setItem("Base_DATOS", JSON.stringify(arre));
}

$(document).ready(function(){

  $('.datepicker').datepicker({
  format: 'dd-mm-yyyy',
  todayHighlight: true,
  toggleActive: true
  });
  
});



/* para después */
 /*  function mostrar(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        document.getElementById("img").src = reader.result;
      }
    }
  }  */


/* fin para después */