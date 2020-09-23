
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

/** Ejecucion inicial de Promesa Javascript 
 * Agrega la categoria actual como titulo 
 * Agrega las opciones de categoria en el menu
 *  */
pA.then((respuestaA) => {
    jsonResponseA = JSON.parse(respuestaA); //JSON de respuesta obtenida
    let categoriaActual = jsonResponseA[0]["name"]; //Primer categoria como default
    displayCategoriaActual(categoriaActual); //actualizacion de título categoría actual
    displayCards(jsonResponseA[0]["products"]); //actualización de listado actual

    for (i = 0; i < jsonResponseA.length; i++) {
        addCategoria(i, jsonResponseA[i]); //inclusion de todas las categorias
    }
}).catch((respuesta) => {
    console.log(respuesta)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------Funciones de actualización------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let listaProductosCarrito = [];
let nItemsCarrito = 0;
let costoTotalCarrito=0;
/** Funcion para cambiar la categoria
 * Agrega la categoria como un div col con un boton interno
 *  */
function cambiarCategoria(i, data) {
    categoriaActual = data["name"];
    //console.log(categoriaActual);
    pA.then((respuestaA) => {
        jsonResponseA = JSON.parse(respuestaA); //JSON de respuesta obtenida
        displayCategoriaActual(categoriaActual)
        displayCards(jsonResponseA[i]["products"]);
    })

}
/** Funcion para agregar un producto al carrito
 * Agrega una lista con los datos del producto a la lista del carrito
 *  */
function agregarProductoAcarrito(dataProduct, title) {
    let yaIngresado = false;
    let theProduct = [];
    for (k = 0; k < dataProduct.length; k++) {
        if (dataProduct[k]["name"] == title) {
            theProduct = dataProduct[k];
        }
    }
    if (listaProductosCarrito.length == 0) {
        listaProductosCarrito = [[1, 1, theProduct["name"], theProduct["price"], parseFloat(theProduct["price"])]];
        nItemsCarrito++;
    }
    else {
        for (i = 0; i < listaProductosCarrito.length; i++) {
            if (listaProductosCarrito[i][2] == theProduct["name"]) {
                listaProductosCarrito[i] = [listaProductosCarrito[i][0], listaProductosCarrito[i][1] + 1, listaProductosCarrito[i][2], listaProductosCarrito[i][3], listaProductosCarrito[i][4] + parseFloat(theProduct["price"])]
                yaIngresado = true
                nItemsCarrito++;
            }
        }
        if (!yaIngresado) {
            listaProductosCarrito.push([listaProductosCarrito.length + 1, 1, theProduct["name"], theProduct["price"], parseFloat(theProduct["price"])])
            nItemsCarrito++;
        }
    }
    let nIcons = document.querySelector(".topIconsItems");
    let h6 = document.createElement("h6");
    while (nIcons.firstChild) {
        nIcons.removeChild(nIcons.lastChild);
    }
    h6.innerHTML = nItemsCarrito + " items";
    nIcons.appendChild(h6);
    //console.log(listaProductosCarrito);
}
/** Funcion para agregar cada una de las categorias en el menu de busqueda
 * Agrega la categoria como un div col con un boton interno
 *  */
function addCategoria(i, data) {
    let div = document.querySelector(".theMenu");
    let col = document.createElement("div");
    col.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2"
    let categoriaButton = document.createElement("button");
    categoriaButton.className = "btn menuItem";
    categoriaButton.id = data["name"]
    categoriaButton.innerHTML = data["name"];
    categoriaButton.onclick = function () { cambiarCategoria(i, data); };

    col.appendChild(categoriaButton);
    div.appendChild(col);
}
/** Funcion para agregar actualizar el título de la categoria actual
 *  */
function displayCategoriaActual(categoria) {
    let div = document.querySelector(".TituloCategoria");
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
    let h2 = document.createElement("h2");
    h2.innerHTML = categoria;
    div.appendChild(h2);
}

/** Funcion para confirmar carrito actual, limpiar contenido y recibir compra por consola
 *  */
function confirmTable() {
    console.log(listaProductosCarrito);
    cleanTable();
}

/** Funcion para limpiar la tabla y la lista guardada del carrito actual
 *  */
function cleanTable() {
    listaProductosCarrito = [];
    nItemsCarrito = 0;
    costoTotalCarrito=0;
    let carritoTable = document.querySelector(".tablaCarrito");
    while (carritoTable.firstChild) {
        carritoTable.removeChild(carritoTable.lastChild);
    }
    let total=document.querySelector(".TotalCarrito");
    let b=document.createElement("b");
    b.innerHTML="Total: $0";
    while (total.firstChild) {
        total.removeChild(total.lastChild);
    }
    total.appendChild(b);
    let nIcons = document.querySelector(".topIconsItems");
    let h6 = document.createElement("h6");
    while (nIcons.firstChild) {
        nIcons.removeChild(nIcons.lastChild);
    }
    h6.innerHTML = "0 items";
    nIcons.appendChild(h6);
}

/** Funcion para ocultar menu y mostrar carrito actual
 *  */
function showTable() {
    let order = document.querySelector(".orderSection");
    if (order.className == "orderSection collapse") {
        order.className = "orderSection collapse.show";
    } else {
        order.className = "orderSection collapse";
    }
    let menu = document.querySelector(".menuSection");
    menu.className = "orderSection collapse";

    let carritoTable = document.querySelector(".tablaCarrito");
    while (carritoTable.firstChild) {
        carritoTable.removeChild(carritoTable.lastChild);
    }

    for (c = 0; c < listaProductosCarrito.length; c++) {
        costoTotalCarrito=costoTotalCarrito+parseFloat(listaProductosCarrito[c][4]);

        let row = document.createElement("tr");
        let cellNum = document.createElement("td");
        let cellQty = document.createElement("td");
        let cellName = document.createElement("td");
        let cellPrice = document.createElement("td");
        let cellAmount = document.createElement("td");
        cellNum.innerHTML = listaProductosCarrito[c][0];
        cellQty.innerHTML = listaProductosCarrito[c][1];
        cellName.innerHTML = listaProductosCarrito[c][2];
        cellPrice.innerHTML = listaProductosCarrito[c][3];
        cellAmount.innerHTML = listaProductosCarrito[c][4];
        row.appendChild(cellNum);
        row.appendChild(cellQty);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellAmount);
        carritoTable.appendChild(row);
    }
    let total=document.querySelector(".TotalCarrito");
    let b=document.createElement("b");
    b.innerHTML="Total: $" + costoTotalCarrito;
    while (total.firstChild) {
        total.removeChild(total.lastChild);
    }
    total.appendChild(b)
}
/** Funcion para agregar cards segun lista recibida
 *  */
function displayCards(products) {
    let div = document.querySelector(".theCards");
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
    for (j = 0; j < products.length; j++) {
        let col = document.createElement("div")
        let card = document.createElement("div");
        let currentImg = document.createElement("img");
        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("h5");
        let cardText = document.createElement("p");
        let cardPrice = document.createElement("b");
        let newLine = document.createElement("br");
        let cardButton = document.createElement("a");

        col.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2";
        card.className = "card";
        card.style = "width: 18rem;";
        currentImg.className = "card-img-top";
        cardBody.className = "card-body";
        cardTitle.className = "card-title";
        cardText.className = "card-text";
        cardButton.className = "btn btn-dark ";
        cardButton.id = products[j]["name"];

        currentImg.src = products[j]["image"];
        currentImg.alt = "Card image cap";
        cardTitle.innerHTML = products[j]["name"];
        cardText.innerHTML = products[j]["description"];
        cardPrice.innerHTML = products[j]["price"];
        cardButton.innerHTML = "Add to car";
        cardButton.onclick = function () { agregarProductoAcarrito(products, cardTitle.innerHTML); };

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
