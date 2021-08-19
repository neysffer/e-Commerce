//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/* $.getJSON(PRODUCTS_URL, function(json){
    console.log(json);  
});
var jsonStr = JSON.stringify(PRODUCTS_URL);
document.body.innerHTML = jsonStr; */
 
let productos;
function ShowList(autos){
    const lis_products = document.createElement("ul");
    for(productos of autos){
        const item = document.createElement("li");
        item.appendChild(document.createElement("object")); 
        item.appendChild(document.createTextNode(`${productos.name} ${productos.description} ${productos.currency} ${productos.cost}`));
        lis_products.appendChild(item);
    }
    document.body.appendChild(lis_products); 
 }    

   document.addEventListener("DOMContentLoaded", async function (e) {
    const autos = (await getJSONData(PRODUCTS_URL)).data;
    ShowList(autos);
});   

