//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const arre_clientes = [];
const arreRegister = [];
const userRandom = "User_";
const userRandomLastNam = "199";

function buttonSignIn(){
    const txtUser = document.getElementById("user");
    const txtContra = document.getElementById("contr");
    const user = txtUser.value;
    const contraseña = txtContra.value;
    if (user && contraseña) {
       // txtUser.value = "";
       // txtContra.value = "";
        arre_clientes.push({
        "name" :  user,
        "pass" : contraseña,
        "user" : userRandom,
        "lastNam" : userRandomLastNam,
        "img" : "/img/camera.png",
        }); 
    localStorage.setItem("Base_DATOS", JSON.stringify(arre_clientes));
    //console.log(sessionStorage.getItem("DATA"));
    window.location = "index.html";
    } else {
        alert("Usuario y contraseña no deben ser vacíos");
    }
    //localStorage.removeItem("DATA")
}


function registerClient(){
    const regUser = document.getElementById("registerName").value;
    const regEmail = document.getElementById("registerEmail").value;
    const regPhone = document.getElementById("registerPhone").value;
    const regPassword = document.getElementById("registerPass").value;
    let selected = document.getElementById("selectNumber");
    /* let selectedNumberPhone = selected.options[selected.selectedIndex].text; */

   if(regUser && regPassword)
   {
       arreRegister.push({
        "name" : regUser,
        "email" : regEmail,
        "phone" : regPhone,
        "numbSelect" : selected.selectedIndex,
        "pass" :  regPassword,
        "user" : userRandom,
        "lastNam" : userRandomLastNam,
        "img" : "/img/camera.png",
        "age" : "Edad"
       });

       window.location = "index.html";
       localStorage.setItem("Base_DATOS", JSON.stringify(arreRegister));
   }else{
    alert("Usuario y contraseña no deben ser vacíos");
   }
console.log(arreRegister);
}

console.log(localStorage.getItem("Base_DATOS"));
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn").addEventListener("click", buttonSignIn);

    document.getElementById("btnRegisterAcepted").addEventListener("click", registerClient);
});