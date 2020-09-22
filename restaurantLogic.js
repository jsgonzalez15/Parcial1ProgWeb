
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


pA.then((respuestaA) => {
    jsonResponseA = JSON.parse(respuestaA) //JSON de respuesta obtenida

    for (i = 0; i < jsonResponseA.length; i++) {
        console.log(jsonResponseA[i])
        addEventSquirrel(i, jsonResponseA[i])
        //if (jsonResponse.[""]>maximaCantidad){
        //maximaCantidad=jsonResponse[i][""]
        //maximoVendedor=jsonResponse[i]["nombreProducto"]
        //}
    }
}).catch((respuesta) => {
    console.log(respuesta)
})
//alert('hola');
function addEventSquirrel(i, data) {
    let table = document.querySelector(".tableEvents");
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    cell1.innerHTML = i + 1;
    cell2.innerHTML = data["events"];
    cell3.innerHTML = data["squirrel"];
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    if (data["squirrel"]) {
        row.classList.add("table-danger")
    }
    table.appendChild(row);
    console.log("cell2")
}
