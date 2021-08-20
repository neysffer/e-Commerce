//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/* $.getJSON(PRODUCTS_URL, function(json){
    console.log(json);  
});
var jsonStr = JSON.stringify(PRODUCTS_URL);
document.body.innerHTML = jsonStr; */
 
let productos; //Creo una variable ya que no me funciona crearla dentro del for
function ShowList(autos){ //Función a la que le ingresa el JSON correspondiente
    let lis_img = document.getElementById("imagen_es");//Traigo el div de id "imagen_es" que se encuentra en el products.html
    /* const lis_products = document.createElement("ul"); */
    lis_img.innerHTML = ``//Lo contenido dentro de aqui se asignara al div de nombre lis_img
    for(productos of autos){//Ciclo for que recorre todo el arreglo que se trae del JSON
        const item = document.createElement("li");//Creo una celda
        const div = document.createElement("div");//Creo una etiqueta div
        item.appendChild(document.createTextNode(`${productos.name} ${productos.description} ${productos.currency} ${productos.cost}`));//A la celda item le agrego info del arreglo
        /* lis_products.appendChild(item); */
        div.innerHTML =  `                   
         <div class="col-3">
         <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
         </div>`//A mi etiqueta div le agrego la imágen 
        /* item.appendChild(document.createElement("object"));  */
        lis_img.appendChild(item);//Inserto al div lis_img el item
        lis_img.appendChild(div);//Inserto al div lis_img el div con la imágen
        
    }
    
     /* document.body.appendChild(lis_products);  */
 }    

   document.addEventListener("DOMContentLoaded", async function (e) {
    const autos = (await getJSONData(PRODUCTS_URL)).data;//Traigo el JSON con mi lista de productos
    ShowList(autos);//Llamo a mi función
});   

