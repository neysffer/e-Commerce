let cartProduct;
let arre = [];
let g = -1;
let value;
let pineCount;

document.addEventListener("DOMContentLoaded", async function(e)
{
    getJSONData(CART_INFO_URL).then(function(a)
    {
        if(a.status === "ok")
        {
            cartProduct = a.data;
            let cartProduct_name = document.getElementById("cartProductName");
            let cartProduct_img = document.getElementById("cartProductIMG");
            let cartProduct_total = document.getElementById("totalProducts");
            let cartProduct_cost = document.getElementById("coin");

            cartProduct_cost.innerHTML = "Costo por unidad:" + " " + cartProduct[`articles`][0].currency + cartProduct[`articles`][0].unitCost;
            cartProduct_name.innerHTML = cartProduct[`articles`][0].name;
            cartProduct_img.innerHTML = `<p><img  src="` + cartProduct[`articles`][0].src + `"></img> </p>`
            cartProduct_total.innerHTML = "Cantidad:" + " " + cartProduct[`articles`][0].count;
            pineCount = (cartProduct[`articles`][0].count)*(cartProduct[`articles`][0].unitCost);

            document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][0].currency + (cartProduct[`articles`][0].count)*(cartProduct[`articles`][0].unitCost));
            document.getElementById("costUnit").innerHTML = (cartProduct[`articles`][0].currency + (cartProduct[`articles`][0].count)*(cartProduct[`articles`][0].unitCost));

        }
    })

    const relationedProducts = (await getJSONData(PRODUCTS_URL)).data;
    showRelationedProducts(relationedProducts);

    document.getElementById("changeCant").addEventListener("click", changeCartCant);

    document.getElementById("-11").addEventListener("click", addCartCars);
    document.getElementById("01").addEventListener("click", addCartCars1);
    document.getElementById("11").addEventListener("click", addCartCars2);
    document.getElementById("21").addEventListener("click", addCartCars3);


    const cartButtons = document.querySelectorAll('.cart-button');
    
    cartButtons.forEach(button => {
    
    button.addEventListener('click',cartClick);
    
    });
    
  
   
});
function cartClick(){
    let button =this;
    button.classList.add('clicked');
    }
/* function showRelationedProducts(pine)
{
    console.log(pine);
    let su_itchi = "";
    let m = 0;
    
    for(let i = 0; i < pine.length; i++){
        let imageSrc = pine[i];
        console.log(i);
        if(m == 0)
        {
            su_itchi += `
            <div class="carousel-item active">
                <img class="d-block w-100" src="`+ imageSrc.imgSrc +`">
            </div>
            `
            m = 1;
        }else if(m == 1){
            su_itchi += `
            <div class="carousel-item">
                <img class="d-block w-100" src="`+ imageSrc.imgSrc +`">
            </div>
            `
        }
            
        
        document.getElementById("cartProductRelationed").innerHTML = su_itchi;
    }
 
} */

function showRelationedProducts(pine)
{
    let su_itchi = "";
    
    for(let i = 0; i < pine.length; i++)
    {
        let imageSrc = pine[i];

            su_itchi += `
            <div class="card" style="--delay:`+ g +`;">
            <div class="content">
              <div class="img"><img class="d-block w-100" src="`+ imageSrc.imgSrc +`"></div>
              <div class="details">
                <span class="name">`+ imageSrc.name +`</span>
                <p>`+ imageSrc.currency +` `+ imageSrc.cost +`</p>
              </div>
            </div>
            <button type="button" class="btn btn-outline-primary" id="`+ g+1 +`">Añadir al carrito</button>
          </div>
            `
            
         arre.push({
               "ind": g + 1,
               "img": imageSrc.imgSrc,
               "nam": imageSrc.name,
               "curr": imageSrc.currency,
               "cosT": imageSrc.cost,
            });   

         g += 1;
         
        document.getElementById("cartProductRelationed").innerHTML = su_itchi;
    }
    console.log((arre[0].cosT)*43.3264);
    
}


function changeCartCant(){
    value = document.getElementById("addCant").value;

    document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
    document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][0].currency + (value)*(cartProduct[`articles`][0].unitCost));
    document.getElementById("costUnit").innerHTML = (cartProduct[`articles`][0].currency + (value)*(cartProduct[`articles`][0].unitCost));
}


function addCartCars(){
    let prub = "";
    let cont = (arre[0].cosT)*43;
    let mix = pineCount + cont;

            prub += `
                <img src="`+ arre[0].img+`">
                <dt>`+ arre[0].nam +`</dt>
                <dt>`+ "Costo por unidad:" +``  + arre[0].curr +` `+ arre[0].cosT +`</dt>
                <dt> Cantidad: </dt>
                <dt>`+ "Subtotal:" +``  + arre[0].curr +` `+ arre[0].cosT +`</dt>
                <input type="text" id="addCantCars">
                <button type="button" class="btn btn-outline-primary" id="changeCant">Añadir</button>
                <br><br>
            `
        
            document.getElementById("probo").innerHTML = prub;
            document.getElementById("costUnit").innerHTML = ("UYU" + mix);
}

function addCartCars1(){
    let prub = "";
    let cont = (arre[1].cosT)*43;
    let mix = pineCount + cont;

            prub += `
                <img src="`+ arre[1].img+`">
                <dt>`+ arre[1].nam +`</dt>
                <dt>`+ "Costo por unidad:" +``+ arre[1].curr +` `+ arre[1].cosT +`</dt>
                <dt> Cantidad: </dt>
                <dt>`+ "Subtotal:" +``+ arre[1].curr +` `+ arre[1].cosT +`</dt>
                <input type="text" id="addCantCars">
                <button type="button" class="btn btn-outline-primary" id="changeCant">Añadir</button>
                <br><br>
            `
        
            document.getElementById("probo").innerHTML = prub;
            document.getElementById("costUnit").innerHTML = ("UYU" + mix);
}

function addCartCars2(){
    let prub = "";
    let cont = (arre[2].cosT)*43;
    let mix = pineCount + cont;

            prub += `
                <img src="`+ arre[2].img+`">
                <dt>`+ arre[2].nam +`</dt>
                <dt>`+ "Costo por unidad:" +`` + arre[2].curr +` `+ arre[2].cosT +`</dt>
                <dt> Cantidad: </dt>
                <dt>`+ "Subtotal:" +`` + arre[2].curr +` `+ arre[2].cosT +`</dt>
                <input type="text" id="addCantCars">
                <button type="button" class="btn btn-outline-primary" id="changeCant">Añadir</button>
                <br><br>
            `
        
            document.getElementById("probo").innerHTML = prub;
            document.getElementById("costUnit").innerHTML = ("UYU" + mix);
}

function addCartCars3(){
    let prub = "";
    let cont = (arre[3].cosT)*43;
    let mix = pineCount + cont;

            prub += `
                <img src="`+ arre[3].img+`">
                <dt>`+ arre[3].nam +`</dt>
                <dt>`+ "Costo por unidad:" +`` + arre[3].curr +` `+ arre[3].cosT +`</dt>
                <dt> Cantidad: </dt>
                <dt>`+ "Subtotal:" +`` + arre[3].curr +` `+ arre[3].cosT +`</dt>
                <input type="text" id="addCantCars">
                <button type="button" class="btn btn-outline-primary" id="changeCant">Añadir</button>
                <br><br>
            `
        
            document.getElementById("probo").innerHTML = prub;
            document.getElementById("costUnit").innerHTML = ("UYU" + mix);

            
}




   
    
    
