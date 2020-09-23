
/** Promesa Javascript para solicitud de data
 * retorna la información a desplegar en la página contenido como un response en el caso resolve
 * retorna un mensaje en caso de fallo en el caso reject
 *  */
let pA = new Promise((resolve, reject) => {
    let reqA = new XMLHttpRequest();
    urlA = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'
    reqA.open('GET', urlA);
    reqA.onload = function () {
        if (reqA.status == 200) { resolve(reqA.response) } else { reject('falló la solicitud de información A') }
    };
    reqA.send()
})
let nombreBotonesCategorias=[];

/** Ejecucion inicial de Promesa Javascript 
 * Agrega la categoria actual como titulo 
 * Agrega las opciones de categoria en el menu
 *  */
pA.then((respuestaA) => {
    jsonResponseA = JSON.parse(respuestaA); //JSON de respuesta obtenida
    let categoriaActual= jsonResponseA[0]["name"]; //Primer categoria como default
    displayCategoriaActual(categoriaActual); //actualizacion de título categoría actual
    displayCards(jsonResponseA[0]["products"]); //actualización de listado actual

    for (i = 0; i < jsonResponseA.length; i++) {
        console.log(jsonResponseA[i]);
        addCategoria(i,jsonResponseA[i]);
        nombreBotonesCategorias.push(jsonResponseA[i]["name"])
    }
}).catch((respuesta) => {
    console.log(respuesta)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------Funciones de actualización------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Funcion para cambiar la categoria
 * Agrega la categoria como un div col con un boton interno
 * FALTA ASOCIAR FUNCION DE DISPLAY DE CARDS
 *  */
function cambiarCategoria(i,data){
    categoriaActual=data["name"];
    console.log(categoriaActual);
    pA.then((respuestaA)=>{
        jsonResponseA = JSON.parse(respuestaA); //JSON de respuesta obtenida
        displayCategoriaActual(categoriaActual)
        displayCards(jsonResponseA[i]["products"]);
    })
    
}
/** Funcion para agregar cada una de las categorias en el menu de busqueda
 * Agrega la categoria como un div col con un boton interno
 *  */
function addCategoria(i,data) {
    let div = document.querySelector(".theMenu");
    let col = document.createElement("div");
    col.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
    let categoriaButton = document.createElement("button");
    categoriaButton.className = "btn menuItem";
    categoriaButton.id=data["name"]
    categoriaButton.innerHTML = data["name"];
    categoriaButton.onclick=function(){cambiarCategoria(i,data);};

    col.appendChild(categoriaButton);
    div.appendChild(col);
}
/** Funcion para agregar actualizar la categoria actual
 *  */
function displayCategoriaActual(categoria){
    let div = document.querySelector(".TituloCategoria");
    while (div.firstChild) {
        div.removeChild(div.lastChild);
      } 
    let h2 = document.createElement("h2");
    h2.innerHTML=categoria;
    div.appendChild(h2);
}
/** Funcion para agregar cards segun lista recibida
 *  */
function displayCards(products){
    let div=document.querySelector(".theCards");
    while (div.firstChild) {
        div.removeChild(div.lastChild);
      }
    for (j = 0; j < products.length; j++) {
    let col=document.createElement("div")
    let card=document.createElement("div");
    let currentImg=document.createElement("img");
    let cardBody=document.createElement("div");
    let cardTitle=document.createElement("h5");
    let cardText= document.createElement("p");
    let cardPrice=document.createElement("b");
    let newLine=document.createElement("br");
    let cardButton=document.createElement("a");

    col.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2";
    card.className="card";
    card.style="width: 18rem;";
    currentImg.className="card-img-top";
    cardBody.className="card-body";
    cardTitle.className="card-title";
    cardText.className="card-text";
    cardButton.className="btn btn-dark ";
    cardButton.id=products[j]["name"];
    cardButton.onclick()=function(){};
    
    currentImg.src=products[j]["image"];
    currentImg.alt="Card image cap";
    cardTitle.innerHTML=products[j]["name"];
    cardText.innerHTML=products[j]["description"];
    cardPrice.innerHTML=products[j]["price"];
    cardButton.innerHTML="Add to car";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(newLine);
    cardBody.appendChild(cardText);
    cardBody.appendChild(newLine);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(newLine);
    cardBody.appendChild(cardButton);

    card.appendChild(currentImg);
    card.appendChild(cardBody);

    col.appendChild(card);
    div.appendChild(card);
    }
}
