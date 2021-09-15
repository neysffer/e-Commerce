//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info_product = {};
let arre_comment = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("Img_prod").innerHTML = htmlContentToAppend;
    }
}

    function ShowComments(myjsoncomments){
        let suitchi = "";
        let show_stars = "";
        for(let i = 0; i < myjsoncomments.length; i++){
            let info_comments = myjsoncomments[i];
            let my_stars = info_comments.score;
            /* console.log(JSON.parse(my_stars)); */
            suitchi += ` 
            <div class="container mt-5">
            <div class="text-center p-4">
            </div>
            <hr class="my-3">
            <dl>
              <dt>Usuario: `+ info_comments.user +`</dt>

              <p>` + info_comments.description + `</p>
      
              <p>`+ info_comments.dateTime +`</p>
            
            `
          
            for (let j = 1; j <= (JSON.parse(my_stars)); j++){ 
                
                suitchi+= `
                <span class="fa fa-star checked"></span>
                `
                
            } 

           
        }
        
        document.getElementById("comentarios").innerHTML = suitchi;
        
    }


document.addEventListener("DOMContentLoaded", async function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(a){
        if (a.status === "ok")
        {
            info_product = a.data;

            let product_name  = document.getElementById("Nompre_prod");
            let product_description = document.getElementById("Desc_prod");
            let product_precio = document.getElementById("Precio_prod");
            let product_cantidad = document.getElementById("Cant_prod");
            let product_ctegoria = document.getElementById("Cate_prod");
        
            product_name.innerHTML = info_product.name;
            product_description.innerHTML = info_product.description;
            product_precio.innerHTML = " "+info_product.currency+" "+info_product.cost+" ";
            product_cantidad.innerHTML = info_product.soldCount;
            product_ctegoria.innerHTML = info_product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(info_product.images);
        }
    });

    const the_comments = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data;
        ShowComments(the_comments);
});