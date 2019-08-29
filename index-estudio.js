//habito de poner el mismo nombre en la constante del modulos q esta llamando
// const os = require("os");
// console.log(os.platform());
// console.log(os.release());
// console.log("free mem:", os.freemem(), "bytes");
// console.log("total mem:", os.totalmem(), "bytes");


//criar archivo y leerlos 
// const fs = require("fs");
//con callback codigo assincrono
// fs.writeFile("./texto.txt", "linea dos", function (err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log("Archivo creado");
// });

// console.log("ultima linea de codigo");

// fs.readFile("./texto.txt", function (err, data) {
//     if (err) {
//         console.lof(err);
//     }
//     //tranforma los datos en una string
//     console.log(data.toString());
// })

// //consulta en la base de datos
// const users = query("SELECT * FROM users");
// query("SELECT * FROM users", function (err, users) {
//     if (err) {
//         console.log(err);
//     }
//     if (users) {

//     }
// });

//peticion HTTP d elos clientes e tener respuestas del servidor
const http = require("http");

// // const handleServer = 
// http.createServer(function (req, res) {
//     res.writeHead(404, {
//         "Content-type": "text/html"
//     });
//     res.write("<h1>Hola mundo desde Node<h1>");
//     res.end();
// }).listen(3000);

// http.createServer(handleServer).listen(3000);

let myFirstPromise = Promise.resolve("Hola Mundo");

myFirstPromise.then(response => {
    console.log(response)
});

let mySecondPromise = newPromise((resolve, reject) => {
    setTimeout(() => resolve(5), 200)
});