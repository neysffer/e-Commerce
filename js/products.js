//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/* $.getJSON(PRODUCTS_URL, function(json){
    console.log(json);  
});
var jsonStr = JSON.stringify(PRODUCTS_URL);
document.body.innerHTML = jsonStr; */

const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST= "Z";
const ORDER_DESC_BY_CANT= "ZA";
const ORDER_NORMAL = " ";
var Products_Array = [];
var So_rt = undefined;
var mini_mon = undefined;
var maxi_mo = undefined;

//const arre_prueba = [];
//let productos; //Creo una variable ya que no me funciona crearla dentro del for
//function ShowList(autos){ //Función a la que le ingresa el JSON correspondiente
   // let lis_img = document.getElementById("imagen_es");//Traigo el div de id "imagen_es" que se encuentra en el products.html
    /* const lis_products = document.createElement("ul"); */
    //lis_img.innerHTML = ``//Lo contenido dentro de aqui se asignara al div de nombre lis_img
    
    //for(productos of autos){//Ciclo for que recorre todo el arreglo que se trae del JSON
       // const item = document.createElement("li");//Creo una celda
       // const div = document.createElement("div");//Creo una etiqueta div
       // item.appendChild(document.createTextNode(`${productos.name} ${productos.description} ${productos.currency} ${productos.cost} `));//A la celda item le agrego info del arreglo
        /* lis_products.appendChild(item); */
       // div.innerHTML =  `                   
       //  <div class="col-3">
      //   (<small id="Cantidad" class="text-muted">` + productos.soldCount + ` artículos</small>)
       //  <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
      //   </div>`//A mi etiqueta div le agrego la imágen 
        /* item.appendChild(document.createElement("object"));  */
       // lis_img.appendChild(item);//Inserto al div lis_img el item
      //  lis_img.appendChild(div);//Inserto al div lis_img el div con la imágen
      //  arre_prueba.push(productos);
        
   // }

    //console.log(arre_prueba);
   
    
     /* document.body.appendChild(lis_products);  */
 //}    
  
  // function Filtro_precio(){
      //  const txtMin = document.getElementById("min");
       // const txtMax = document.getElementById("max");
      //  const sobre_escribo = document.getElementById("imagen_es")
       // const min_imo = txtMin.value;
      //  const max_imo = txtMax.value;
     //   sobre_escribo.innerHTML = ``
      //  for(let i of arre_prueba){
         //   if(0 <= min_imo && i.cost <= max_imo){
               
            //    const item2 = document.createElement("li");//Creo una celda
             //   const div2 = document.createElement("div");//Creo una etiqueta div
             //   item2.appendChild(document.createTextNode(`${i.name} ${i.description} ${i.currency} ${i.cost} `));//A la celda item le agrego info del arreglo
             //   div2.innerHTML =  `                   
             //    <div class="col-3">
             //    <small class="text-muted">` + i.soldCount + ` artículos</small>
             //    <img src="` + i.imgSrc + `" alt="` + i.description + `" class="img-thumbnail">
             //    </div>`//A mi etiqueta div le agrego la imágen 
             //   sobre_escribo.appendChild(item2);//Inserto al div lis_img el item
              //  sobre_escribo.appendChild(div2);//Inserto al div lis_img el div con la imágen
       
          //  }

      //  }     
       
  //  } 


    function sort_Productos(criteria, array){
        let result = [];
        if (criteria === ORDER_ASC_BY_COST)
        {
            result = array.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_DESC_BY_CANT){
            result = array.sort(function(a, b) {
                if ( a.soldCount > b.soldCount ){ return -1; }
                if ( a.soldCount < b.soldCount ){ return 1; }
                return 0;
            });
        }else if(criteria === ORDER_NORMAL){
            result = array;

        }else if (criteria === ORDER_DESC_BY_COST){
            result = array.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
        }
        
        return result;
    }
    
    function ShowProductsList(){
    
        let htmlContentToAppend = "";
        for(let i = 0; i < Products_Array.length; i++){
            let productos = Products_Array[i];
    
              if (((mini_mon == undefined) || (mini_mon != undefined && parseInt(productos.cost) >= mini_mon)) &&
                ((maxi_mo == undefined) || (maxi_mo != undefined && parseInt(productos.cost) <= maxi_mo))){   
    
                htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action" id="cambio">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 id="titulos_cars" class="mb-1">`+ productos.name +`</h4>
                                <small id="cant_cars">` + productos.soldCount + ` artículos</small>
                            </div>
                            <p id="desc_cars" class="mb-1">` + productos.description + ` </p>
                            <p id="cost_cars" class="mb-1"> `+ productos.currency+ ` `+ productos.cost +`</p>
                        </div>
                    </div>
                </a>
                `
           }
    
            document.getElementById("imagen_es").innerHTML = htmlContentToAppend;
        }
    }
    
    function sortAndShowProducts(sortCriteria, Array){
        So_rt = sortCriteria;
    
        if(Array != undefined){
            Products_Array = Array;
        }
    
        Products_Array = sort_Productos(So_rt, Products_Array);
    
        //Muestro los productos ordenados
        ShowProductsList();
    }


   document.addEventListener("DOMContentLoaded",  async function (e) {
    //const autos = (await getJSONData(PRODUCTS_URL)).data;//Traigo el JSON con mi lista de productos
    //ShowList(autos);//Llamo a mi función

    //document.getElementById("btn_filP").addEventListener("click",Filtro_precio);


    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_NORMAL, resultObj.data);
        }
    });

    document.getElementById("ascendente").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("descendente_precio").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("descendente").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_CANT);
    });


    document.getElementById("btn_filP").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        mini_mon = document.getElementById("min").value;
        maxi_mo = document.getElementById("max").value;
        //Hago comparaciones en funcion del valor minimo y maximo
        if ((mini_mon != undefined) && (mini_mon != "") && (parseInt(mini_mon)) >= 0){
            mini_mon = parseInt(mini_mon);
        }
        else{
            mini_mon = undefined;
        }

        if ((maxi_mo != undefined) && (maxi_mo != "") && (parseInt(maxi_mo)) >= 0){
            maxi_mo = parseInt(maxi_mo);
        }
        else{
            maxi_mo = undefined;
        }

        ShowProductsList();
    });
    
    
});   

