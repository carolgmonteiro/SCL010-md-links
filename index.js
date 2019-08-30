// const mdlinks = require("./md-links.js")
//para obtener rutas de archivos
const path = require("path");
//pone colores en linea de comando
const chalk = require("chalk");
//leer los archivos / verificar se existe
const fs = require('fs');
//para crear el servicio
const http = require("http");
const fileHound = require("fileHound");


// let script_path = process.argv[1];
// console.log("SCRIPT:", script_path);
let userPathToFile = process.argv[2];
console.log("PATH:", userPathToFile);
let firstOption = process.argv[3];
console.log("FIRST OP:", firstOption);
let secondOption = process.argv[4];
console.log("SECOND OP:", secondOption);

userPathToFile = path.normalize(userPathToFile)

//encuentrar archivo en el sistema
const files = fileHound.create()
    .discard("node_modules") //saca la carpeta
    .paths("./")
    .ext("md")
    .find();

files.then(console.log);

fs.stat(userPathToFile, function (err) {
    if (!err) {
        console.log('Sí el archivo o directorio existe');
    } else if (err.code === 'ENOENT') {
        console.log('Oh! el archivo o directorio NO existe');
    }
});

// //verificar se archivo existe
// fs.exists(userPathToFile, function (exists) {
//     if (exists) {
//         console.log('yes');
//     } else {
//         console.log("no");
//     }
// });

// process.argv.forEach((val, index) => {
//     console.log(`Hola ${index}: entonces ${val}`)
// });

// let pathFile = path.parse(__filename);
// console.log(pathFile);

// // funcion para saber se archivo existe
// function filePathExists(userPathToFile) {
//     return new Promise((resolve, reject) => {
//         fs.stat(userPathToFile, (err, stats) => {
//             if (err && err.code === 'ENOENT') {
//                 return resolve(false);
//             } else if (err) {
//                 return reject(err);
//             }
//             if (stats.isFile() || stats.isDirectory()) {
//                 return resolve(true);
//             }
//         });
//     });
// }

// function checkDirectorySync(directory) {
//     try {
//         fs.statSync(directory);
//     } catch (e) {
//         try {
//             fs.mkdirSync(directory);
//         } catch (e) {
//             return e;
//         }
//     }
// }

// // criar archivo y leerlos 
// const fs = require("fs");
// //con callback codigo assincrono
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

// module.exports = () => {
//   // ...
// };