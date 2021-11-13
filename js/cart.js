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
const buttons = document.querySelectorAll("#cardMaster, #cardVisa, #cardPay");
let myId;
let priceChangeFinal;
let directionStatus;
let tOf = false;


document.addEventListener("DOMContentLoaded", async function(e)
{
    document.getElementById("btnAnimated").innerHTML = ` <button class="cart-button" id="buyBtn"> <span class="add-to-cart">Comprar</span> <span class="added">Confirmado</span>
     <i class="fa fa-shopping-cart"></i> <i class="fa fa-square"></i> </button>`;

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
                document.getElementById("sub_Total").innerHTML =  (cartPine.currency + (cartPine.count)*(cartPine.unitCost));
                priceChangeFinal = (cartPine.count)*(cartPine.unitCost);
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

    buttons.forEach(botonSelected => { 
        botonSelected.addEventListener("click", function(){
            myId = this.id;
            
            if(myId == "cardMaster"){
                document.getElementById("cardVisa").style.background = "none"
                document.getElementById("cardPay").style.background = "none"
                document.getElementById(myId).style.background = "rgb(0, 123, 255)"
            }else if(myId == "cardVisa"){
                document.getElementById("cardMaster").style.background = "none"
                document.getElementById("cardPay").style.background = "none"
                document.getElementById(myId).style.background = "rgb(0, 123, 255)"
            }else if(myId == "cardPay"){
                document.getElementById("cardVisa").style.background = "none"
                document.getElementById("cardMaster").style.background = "none"
                document.getElementById(myId).style.background = "rgb(0, 123, 255)"
            }
            showInfoModal();
        });
    })
        console.log(buttons)
        document.getElementById("buyBtn").addEventListener("click", showInfoModal);

   /*  document.getElementById("continue").addEventListener("click", showDirectionInfo); */
    
});


function cartClick(){
    let button = this;
    button.classList.add('clicked');
    alert("Su compra se procesó con éxito")
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
            document.getElementById("sub_Total").innerHTML = (cartProduct[`articles`][j].currency + (value)*(cartProduct[`articles`][j].unitCost));
            priceChangeFinal = (value)*(cartProduct[`articles`][j].unitCost);
        }
    }else{
        for(let j = 0; j < cartProduct[`articles`].length; j++)
        { 
            pineAndcarCostTotal = pineAndcarCost + ((value)*(cartProduct[`articles`][j].unitCost));
            document.getElementById("totalProducts").innerHTML = "Cantidad:" + value;
            document.getElementById("subTotal").innerHTML = "Subtotal:" + " " + (cartProduct[`articles`][j].currency + (value)*(cartProduct[`articles`][j].unitCost));
            document.getElementById("costTotal").innerHTML = (cartProduct[`articles`][j].currency + pineAndcarCostTotal);
            document.getElementById("sub_Total").innerHTML =  (cartProduct[`articles`][j].currency + pineAndcarCostTotal);
            priceChangeFinal =  pineAndcarCostTotal;
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
        document.getElementById("sub_Total").innerHTML = "UYU" + totalCost;
        pineAndcarCost = totalCost - 200;
        priceChangeFinal = totalCost;
}


function showInfoModal(){
    let infoModals = "";
    let selectShipp = document.getElementById("send").value;
    let changePrice = document.getElementById("costTotal");
    let porcentTotal;
    
    console.log(selectShipp)

    if(selectShipp == 0){
        alert("Seleccione un tipo de envío")
        window.location = "cart.html"
    }else if(selectShipp == 1){
        porcentTotal = priceChangeFinal * 0.15;
        porcentTotal += priceChangeFinal;
        changePrice.innerHTML = "UYU" + porcentTotal;
    }else if(selectShipp == 2){
        porcentTotal = priceChangeFinal * 0.07;
        porcentTotal += priceChangeFinal;
        changePrice.innerHTML = "UYU" + porcentTotal;
    }else if(selectShipp == 3){
        porcentTotal = priceChangeFinal * 0.05;
        porcentTotal += priceChangeFinal;
        changePrice.innerHTML = "UYU" + porcentTotal;
    }


    if(myId !== undefined)
    {
        document.getElementById("btnAnimated").innerHTML = ` <button class="cart-button" id="buyBtn" data-toggle="modal" data-target="#exampleModal" > <span class="add-to-cart">Comprar</span> <span class="added">Confirmado</span> <i class="fa fa-shopping-cart"></i> <i class="fa fa-square"></i> </button>`
        if(myId == "cardMaster" || myId == "cardVisa")
        {
            infoModals = `
                <div class="form-group">
                    <label>Nombre</label>
                        <input class="form-control" id="name" type="text" placeholder="Enter your name" required>
                        <br>
                    <label>Número de tarjeta</label>
                        <input class="form-control" id="numbCard" type="text" placeholder="0000 0000 0000 0000" required>
                        <br>
                    <label>Vencimiento</label>
                        <input id="cad" class="form-control" type="date">
                        <br>
                    <label>CVV/CVC</label>
                        <input id="cvv" class="form-control" id="cvv" type="text" placeholder="123">
                </div>
            `
             document.querySelector(".modal-body").innerHTML = infoModals;
        }else if(myId == "cardPay"){
           
            infoModals = `
            <div class="form-group">
                <label>Correo electrónico</label>
                    <input class="form-control" id="hotmail" type="text" placeholder="Email" required>
                <br>
                <label>Contraseña</label>
                    <input class="form-control" id="seña" type="password" placeholder="Contraseña" required>
            </div>        
            `
            document.querySelector(".modal-body").innerHTML = infoModals;
        }
        document.getElementById("continue").addEventListener("click", showDirectionInfo);
    }else{
        alert("Seleccione un método de pago.");
    }

    document.getElementById("buyBtn").addEventListener("click", showInfoModal);
    
}

function showDirectionInfo(){
    let infoDirection = "";
    let name = document.getElementById("name");
    let card = document.getElementById("numbCard");
    let cad = document.getElementById("cad");
    let cvv = document.getElementById("cvv");
    let hotmail = document.getElementById("hotmail");
    let seña = document.getElementById("seña");
    console.log(hotmail);
    
    if(name !== null && card !== null && cad !== null && cvv !== null)
    {

        if(name.value !== "" && card.value !== "" && cad.value !== "" && cvv.value !== "")
        {
            infoDirection = `  
                <div class="form-group">  
                    <label>País</label>
                        <input class="form-control" id="pais" type="text" placeholder="País" required>
                    <br>
                    <label>Dirección</label>
                        <input class="form-control" id="direction" type="text" placeholder="Dirección" required>
                    <br>    
                    <label>Calle</label>
                        <input class="form-control" id="street" type="text" placeholder="Calle" required>
                    <br>
                    <label>Número</label>
                        <input class="form-control" id="number" type="text" placeholder="Número" required>
                    <br>
                    <label>Esquina</label>
                        <input class="form-control" id="esq" type="text" placeholder="Esquina" required>
                    <br>
                </div> 
                `
                directionStatus = document.getElementById("changeButton");
                document.querySelector(".modal-body").innerHTML = infoDirection;
                document.getElementById("changeButton").innerHTML = ` <button id="aceptar" type="button" class="btn btn-primary">Aceptar</button>`
        }else{
            alert("Llene todos los campos para continuar");
        }
    }else if(hotmail !== null && seña !== null){
        if(hotmail.value !== "" && seña.value !== ""){

            infoDirection = `  
            <div class="form-group">  
                <label>País</label>
                    <input class="form-control" id="pais" type="text" placeholder="País" required>
                <br>   
                <label>Calle</label>
                    <input class="form-control" id="street" type="text" placeholder="Calle" required>
                <br>
                <label>Número</label>
                    <input class="form-control" id="number" type="text" placeholder="Número" required>
                <br>
                <label>Esquina</label>
                    <input class="form-control" id="esq" type="text" placeholder="Esquina" required>
                <br>
            </div> 
            `
            directionStatus = document.getElementById("changeButton");
            document.querySelector(".modal-body").innerHTML = infoDirection;
            document.getElementById("changeButton").innerHTML = ` <button id="aceptar" type="button" class="btn btn-primary">Aceptar</button>`
        }else{
            alert("Llene todos los campos para continuar");
        }
    }
   
    document.getElementById("aceptar").addEventListener("click", aceptBuy);
    
}  

function aceptBuy(){
    let pais = document.getElementById("pais").value;
    let street = document.getElementById("street").value;
    let numb = document.getElementById("number").value;
    let esq = document.getElementById("esq").value;

    if(pais !== "" && street !== "" && numb !== "" && esq !== "")
    {
        confirm("¿Estás seguro de proseguir con tu compra? No hay vuelta atrás, si es así, confirma tu compra al finalizar.")
        if(confirm){
            $('#exampleModal').modal('hide');
            
            document.getElementById("btnAnimated").innerHTML = ` <button class="cart-button" id="buyBtn"> <span class="add-to-cart">Confirmar</span> <span class="added">Confirmado</span>
            <i class="fa fa-shopping-cart"></i> <i class="fa fa-square"></i> </button>`;

            const cartButtons = document.querySelectorAll('.cart-button');
        
            cartButtons.forEach(button => {
        
            button.addEventListener('click',cartClick);
        
        });
        }
    }else{
        alert("Completa todo los campos.")
    }

}
    
