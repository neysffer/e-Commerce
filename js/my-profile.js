//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function mostrarUser(){
    const user = document.getElementById("Usuario");
    const u_ser = sessionStorage.getItem("Base_DATOS");
    user.innerHTML = u_ser;
}

document.addEventListener("DOMContentLoaded", function (e) {
    mostrarUser();
});