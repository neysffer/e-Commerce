let cartProduct;
let arre = [];
let arrePrice = [];
let g = -1;
let value;
let pineCount;
let addAnotherCars = "";
let theInd;
let pineAndcarCost = 0;

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

    document.getElementById("-11").addEventListener("click", function(){
        theInd = 0;
        addCartCars(theInd);
    });
    document.getElementById("01").addEventListener("click", function(){
        theInd = 1;
        addCartCars(theInd);
    });
    document.getElementById("11").addEventListener("click", function(){
        theInd = 2;
        addCartCars(theInd);
    });
    document.getElementById("21").addEventListener("click", function(){
        theInd = 3;
        addCartCars(theInd);
    });


    const cartButtons = document.querySelectorAll('.cart-button');
    
    cartButtons.forEach(button => {
    
    button.addEventListener('click',cartClick);
    
    });
   
});


function cartClick(){
    let button =this;
    button.classList.add('clicked');
    }


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
               "img": imageSrc.imgSrc,
               "nam": imageSrc.name,
               "curr": imageSrc.currency,
               "cosT": imageSrc.cost,
            });   

         g += 1;
         
        document.getElementById("cartProductRelationed").innerHTML = su_itchi;
    }

}


function changeCartCant(){
    value = document.getElementById("addCant").value;
    let pineAndcarCostTotal;
    console.log(pineAndcarCost);

    if(pineAndcarCost == 0){
        document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
        document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][0].currency + (value)*(cartProduct[`articles`][0].unitCost));
        document.getElementById("costUnit").innerHTML = (cartProduct[`articles`][0].currency + (value)*(cartProduct[`articles`][0].unitCost));
    }else{
        pineAndcarCostTotal = pineAndcarCost + ((value)*(cartProduct[`articles`][0].unitCost));
        document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
        document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][0].currency + (value)*(cartProduct[`articles`][0].unitCost));
        document.getElementById("costUnit").innerHTML = (cartProduct[`articles`][0].currency + pineAndcarCostTotal);
    }
}


function addCartCars(ind){
    let i = 0;
    console.log(arre);

    while(i != ind)
    {
        i++
    }

    addAnotherCars += `
    <div class="row text-muted"> `+ arre[i].nam +`</div>
    <div class="row border-top border-bottom">
        <div class="row main align-items-center">
            <div class="col-2"> <img src="`+ arre[i].img+`"></div>
                <div class="col">
                    <div class="row">`+ "Costo por unidad:" +` `+ " " +` `  + arre[i].curr +` `+ arre[i].cosT +`</div>
                    <div class="row"> Cantidad: </div>
                    <div class="row">`+ "Subtotal:" +` `+ " " +` `  + arre[i].curr +` `+ arre[i].cosT +`</div>
                </div>
                    <div class="col"> 
                        <div class="col" id="gg2" data-toggle="button" role="group">
                        <button type="button" class="btn btn-outline-danger" >❤️</button> <button type="button" class="btn btn-outline-danger" >Remover</button>
                    </div>
                    <br>
                    <div class="col" id="checkOut2">
                        <input type="text" id="addCantCars2" placeholder="Cantidad">
                        <button type="button" class="btn btn-outline-primary" id="changeCant2">Añadir</button>
                        <br><br>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    `
    arrePrice.push({
        "cost": arre[i].cosT,
        "coin": arre[i].curr,
    });

    document.getElementById("probo").innerHTML = addAnotherCars;

    showTotalPrice(arrePrice);

}


function showTotalPrice(arre){
    let totalCost = 0;

    for(let i = 0; i < arrePrice.length; i++)
    {
        totalCost += arre[i].cost; 
    }
        totalCost *= 43;
        totalCost += pineCount;
        document.getElementById("costUnit").innerHTML = "UYU" + totalCost;
        pineAndcarCost = totalCost - 200;
}




    
    
