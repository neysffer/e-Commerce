let cartProduct;
let arre = [];
let arrePrice = [];
let g = -1;
let value;
let pineCount;
let addAnotherCars = "";
let theInd;
let pineAndcarCost = 0;
let cartPine;

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
            console.log(cartProduct);
            
            for(let j = 0; j < cartProduct[`articles`].length; j++)
            {
                cartPine =  cartProduct[`articles`][j];
                console.log(cartPine);
                cartProduct_cost.innerHTML = "Costo por unidad:" + " " + cartPine.currency + cartPine.unitCost;
                cartProduct_name.innerHTML = cartPine.name;
                cartProduct_img.innerHTML = `<p><img  src="` + cartPine.src + `"></img> </p>`
                cartProduct_total.innerHTML = "Cantidad:" + " " + cartPine.count;
                pineCount = (cartPine.count)*(cartPine.unitCost);

                document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartPine.currency + (cartPine.count)*(cartPine.unitCost));
                document.getElementById("costTotal").innerHTML = (cartPine.currency + (cartPine.count)*(cartPine.unitCost));
            }
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


function showRelationedProducts(car)
{
    let su_itchi = "";
    
    for(let i = 0; i < car.length; i++)
    {
        let imageSrc = car[i];

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
        for(let j = 0; j < cartProduct[`articles`].length; j++)
        {   
            document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
            document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][j].currency + (value)*(cartProduct[`articles`][j].unitCost));
            document.getElementById("costTotal").innerHTML = (cartProduct[`articles`][j].currency + (value)*(cartProduct[`articles`][j].unitCost));
        }
    }else{
        for(let j = 0; j < cartProduct[`articles`].length; j++)
        { 
            pineAndcarCostTotal = pineAndcarCost + ((value)*(cartProduct[`articles`][j].unitCost));
            document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
            document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][j].currency + (value)*(cartProduct[`articles`][j].unitCost));
            document.getElementById("costTotal").innerHTML = (cartProduct[`articles`][j].currency + pineAndcarCostTotal);
        }
    }
}


function addCartCars(ind){
   /*  let i = 0;
    console.log(arre); */

    /* while(i != ind)
    {
        i++
    } */

    addAnotherCars += `
    <div class="row text-muted"> `+ arre[ind].nam +`</div>
    <div class="row border-top border-bottom">
        <div class="row main align-items-center">
            <div class="col-2"> <img src="`+ arre[ind].img+`"></div>
                <div class="col">
                    <div class="row">`+ "Costo por unidad:" +` `+ " " +` `  + arre[ind].curr +` `+ arre[ind].cosT +`</div>
                    <div class="row"> Cantidad: </div>
                    <div class="row">`+ "Subtotal:" +` `+ " " +` `  + arre[ind].curr +` `+ arre[ind].cosT +`</div>
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
        "cost": arre[ind].cosT,
        "coin": arre[ind].curr,
    });

    document.getElementById("restOfproducts").innerHTML = addAnotherCars;

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
        document.getElementById("costTotal").innerHTML = "UYU" + totalCost;
        pineAndcarCost = totalCost - 200;
}




    
    
