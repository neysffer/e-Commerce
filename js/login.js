//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const arre_clientes = [];

function buttonSignIn(){
    const txtUser = document.getElementById("user");
    const txtContra = document.getElementById("contr");
    const user = txtUser.value;
    const contraseña = txtContra.value;
    if (user && contraseña) {
       // txtUser.value = "";
       // txtContra.value = "";
        arre_clientes.push({
          user,
          contraseña,
        }); 
    sessionStorage.setItem("Base_DATOS", JSON.stringify(arre_clientes));
    //console.log(sessionStorage.getItem("DATA"));
    window.location = "index.html";
    } else {
        alert("Usuario y contraseña no deben ser vacíos");
    }
    //localStorage.removeItem("DATA")
}


document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btn").addEventListener("click", buttonSignIn);
});