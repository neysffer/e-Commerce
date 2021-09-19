//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var info_product = {};
let arre_comment = [];
let comment_data;
let my_info;
let starko;

function Show_IMG(array){

    let Su_itchi = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        
        Su_itchi += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("Img_prod").innerHTML = Su_itchi;
    }
}

    function ShowComments(myjsoncomments){
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

    function Add_comment(){
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

            Show_IMG(info_product.images);
        }
    });

    const the_comments = (await getJSONData(PRODUCT_INFO_COMMENTS_URL)).data;
        ShowComments(the_comments);


    document.getElementById("msg_btn").addEventListener("click", Add_comment);

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

});