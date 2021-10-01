//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info_product = {};
let arre_comment = [];
let comment_data;
let my_info;
let starko;

function show_IMG(array){

    let su_itchi = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        
        su_itchi += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("Img_prod").innerHTML = su_itchi;
    }
}

    function showComments(myjsoncomments){
        let suitchi = "";
        for(let i = 0; i < myjsoncomments.length; i++){
            let info_comments = myjsoncomments[i];
            let my_stars = info_comments.score;
            /* console.log(JSON.parse(my_stars)); */
            suitchi += `
            <hr class="my-3">
            <dl>
              <dt>Usuario: `+ info_comments.user +`</dt>

              <p>` + info_comments.description + `</p>
      
              <p class= "text-muted">`+ info_comments.dateTime +`</p>
            </dl>
            `
          
            for (let j = 1; j <= (my_stars); j++){ 
                
                suitchi+= `
                <span class="fa fa-star checked"></span>
                `
                
            } 

           
        }
        
        document.getElementById("comentarios").innerHTML = suitchi;
        
    }

    function addComments(){
        comment_data = document.getElementById("msg").value;
        my_info = sessionStorage.getItem("Base_DATOS");
        let day_and_hour = new Date();
        let traer_mes = day_and_hour.getMonth()+1;

        let suitchi_1 = "";

        if(starko >= 1){
        if(comment_data != undefined){
            /* console.log(comment_data); */
            suitchi_1 += `
            <hr class="my-3">
            <dl>
              <dt>Usuario: `+ JSON.parse(my_info)[0].user +`</dt>

              <p>` + comment_data + `</p>

              <p class= "text-muted">`+ day_and_hour.getFullYear() + `  `+ "-"+ `  `+ traer_mes + ` `+ "-"+ `  `+ day_and_hour.getDate() +`  `+ day_and_hour.getHours() +` `+ ":"+ ` `+ day_and_hour.getMinutes() +` `+ ":"+ ` `+ day_and_hour.getSeconds() +`</p>

            </dl>
            `
        }

        for (let q = 1; q <= (starko); q++){ 
            suitchi_1+= `
            <span class="fa fa-star checked"></span>
            `
            
        } 
    
        /* console.log(suitchi_1); */
        document.getElementById("My_comments").innerHTML = suitchi_1;
    }
    }


    function relationedProducts(algo){
        let showProducts = "";

        for(let m = 0; m < info_product.relatedProducts.length; m++){
            let n = info_product.relatedProducts[m];
            console.log(n);
            let imageRelationed = algo[n];
        
        
            showProducts += `  
                <div id="tarjetas"> 
                    <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="` + imageRelationed.imgSrc +`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+ imageRelationed.name +`</h5>
                      <p class="card-text">`+ imageRelationed.description +`</p>
                      <p class="card-text">`+ imageRelationed.currency +``+ imageRelationed.cost +`</p>
                      <a href="#" class="btn btn-primary">Ver información</a>
                    </div>
                  </div>
                </div>
            `
            document.getElementById("relationedProducts").innerHTML = showProducts;
        }
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

            show_IMG(info_product.images);
        }
    });

    const the_comments = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data;
        showComments(the_comments);


    document.getElementById("msg_btn").addEventListener("click", addComments);

    document.getElementById("1").addEventListener("click", function(){
        starko = 1;
    });

    document.getElementById("2").addEventListener("click", function(){
        starko = 2;
    });


    document.getElementById("3").addEventListener("click", function(){
        starko = 3;
    });

    document.getElementById("4").addEventListener("click", function(){
        starko = 4;
    });

    document.getElementById("5").addEventListener("click", function(){
        starko = 5;
    });

    const productsRelations = (await getJSONData(PRODUCTS_URL)).data;
        relationedProducts(productsRelations);

});