//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const myDataBase = JSON.parse(localStorage.getItem("Base_DATOS"));
let controlImg;

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
      document.getElementById("selectSex").options.selectedIndex = myDataBase[i].sex;
      document.getElementById("country").placeholder = myDataBase[i].pais;
      document.getElementById("state").placeholder = myDataBase[i].ER;

    }else{
        document.getElementById("changeUserName").innerHTML = (myDataBase)[i].name;
        /* document.getElementById("changeEmail").innerHTML = (myDataBase)[i].email; */
        document.getElementById("changePlaceHolderEmail").placeholder = (myDataBase)[i].email;

        document.getElementById("changeName").innerHTML = (myDataBase)[i].user + " " + (myDataBase)[i].lastNam;

        document.getElementById("changePhone").placeholder = (myDataBase)[i].phone;
        document.getElementById("selectNumber").options.selectedIndex = myDataBase[i].numbSelect;

        document.getElementById("age").placeholder = (myDataBase)[i].age;

        document.getElementById("selectSex").options.selectedIndex = myDataBase[i].sex;
        document.getElementById("country").placeholder = myDataBase[i].pais;
        document.getElementById("state").placeholder = myDataBase[i].ER;
      }
  }

    document.getElementById("btnSaveChange").addEventListener("click", changeInfo);

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
    let selectSex = document.getElementById("selectSex");
    let selectDate = document.getElementById("dp1").value;
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;
    let fecha1 = new Date(selectDate);
    let fecha2 = new Date();
    let resta = fecha2.getTime() - fecha1.getTime();
    let age = (Math.round(resta/ (1000*60*60*24*365)-1));
    /* let selectedNumberPhone = selected.options[selected.selectedIndex].text; */

    console.log(selectSex.selectedIndex);
    
    for(let i = 0; i < parseInt((myDataBase).length) ; i++)
    {
      if(newName !== "" && newLastname !== "" && newEmail !== "" && newPhone !== "" && age !== undefined)
      {
        document.getElementById("changeName").innerHTML = newName + " " + newLastname;
        document.getElementById("age").placeholder = age;
        document.getElementById("selectSex").options.selectedIndex = selectSex.selectedIndex;

        if(country !== "" && state !== "")
        {
          document.getElementById("country").placeholder = country;
          document.getElementById("state").placeholder = state
          arr.push({
              "name" : myDataBase[i].name,
              "email" : newEmail,
              "phone" : newPhone,
              "numbSelect" : selected.selectedIndex,
              "pass" :  myDataBase[i].pass,
              "user" : newName,
              "lastNam": newLastname,
              "img" : myDataBase[i].img,
              "age" : age,
              "sex" : selectSex.selectedIndex,
              "pais" : country,
              "ER" : state
          });
      }else{
        arr.push({
          "name" : myDataBase[i].name,
          "email" : newEmail,
          "phone" : newPhone,
          "numbSelect" : selected.selectedIndex,
          "pass" :  myDataBase[i].pass,
          "user" : newName,
          "lastNam": newLastname,
          "img" : myDataBase[i].img,
          "age" : age,
          "sex" : selectSex.selectedIndex,
          "pais" : "País",
          "ER" : "Estado/Región"
      });
      }

        
        localStorage.setItem("Base_DATOS", JSON.stringify(arr));
      }else{
        alert("Llena los campos obligatorios para continuar.")
      }
    }
}


function changeImage(directionImg)
{
  let arre = [];
  for(let i = 0; i < parseInt((myDataBase).length) ; i++)
  {
    if(directionImg == 0){
      myDataBase[i].img = "img/woman.png";
    }else if(directionImg == 1){
      myDataBase[i].img = "img/man.png";
    }else if(directionImg == 2){
      myDataBase[i].img = "img/siluette_1.png";
    }else if(directionImg == 3){
      myDataBase[i].img = "img/siluette_2.png";
    }

    document.getElementById("changeIMG").innerHTML = ` <img class="rounded-circle mt-5" width="150px" src="` + myDataBase[i].img +`">`

    arre.push({
      "name" : myDataBase[i].name,
      "email" : myDataBase[i].email,
      "phone" : myDataBase[i].phone,
      "numbSelect" : myDataBase[i].numbSelect,
      "pass" :  myDataBase[i].pass,
      "user" : myDataBase[i].user,
      "lastNam": myDataBase[i].lastNam,
      "img" : myDataBase[i].img,
      "age" : myDataBase[i].age,
      "sex" : myDataBase[i].sex,
      "pais" : myDataBase[i].pais,
      "ER" : myDataBase[i].ER
    });
  }
    localStorage.setItem("Base_DATOS", JSON.stringify(arre));
}

$(document).ready(function(){

  $('.datepicker').datepicker({
  format: 'dd-mm-yyyy',
  todayHighlight: true,
  toggleActive: true
  });
  
});
