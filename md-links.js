#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
//para hacer petición url
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;
//file house --- libreria npm
const fileHound = require("fileHound");

// //encuentrar archivo en el sistema
// const files = fileHound.create()
//     .paths("directorio")
//     .ext(".md")
//     .find();

// files.then(console.log);

// //hacer una petición de la URL para que devuelva el status
// fetchUrl("https://www.instagram.com", function (error, meta, body) {
//     console.log("HTTP STATUS:", meta.status);
//     console.log("FINAL URL:", meta.finalUrl);
// });

let pathToFile = process.argv[2];
console.log("PATH:", pathToFile);
let firstOption = process.argv[3];
console.log("FIRST OP:", firstOption);
let secondOption = process.argv[4];
console.log("SECOND OP:", secondOption);
//ruta absoluta para relativa
pathToFile = path.resolve(pathToFile);
console.log("PATH RESOLVE:", pathToFile);
pathToFile = path.normalize(pathToFile);
console.log("PATH NORMALIZE:", pathToFile);
let links = [];
let options = {
  validate: false,
  stats: false,
  flagError: false
};
if (
  (firstOption === "--validate" && secondOption === "--stats") ||
  (firstOption === "--v" && secondOption === "--s")
) {
  options.validate = true;
  options.stats = true;
  // options.flagError = false;
} else if (firstOption === "--validate" || firstOption === "--v") {
  options.validate = true;
  option.stats = false;
  // options.flagError = false;
} else if (firstOption === "--stats" || firstOption === "--s") {
  options.validate = false;
  options.stats = true;
  // options.flagError = false;
}
// else {
//   console.log("Opción no valida");
//   options.validate = false;
//   options.stats = false;
//   options.flagError = true;
// }

const isFileOrDirectory = pathToFile => {
  fs.lstat(pathToFile, (err, stats) => {
    if (err) {
      console.log("Encontramos un error: la ruta no es valida");
    } else if (stats.isDirectory()) {
      console.log("es directorio");
      return goDirectory(path);
    } else {
      console.log("es archivo");
      return goMdFile(path);
    }
  });
};

const goDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fileHound
      .create()
      .discard("node_modules") //saca la carpeta
      .paths(path)
      .ext("md")
      .find((err, files) => {
        if (files.length === 0) {
          console.log(err);
          reject("Lamentablemente no hay archivo .md en este directorio");
        }
      })
      .then(files => {
        resolve(files);
      });
  });
};

const goMdFile = (file) => {
  return new Promise((resolve, reject) => {
    let extFile = path.extname(file);
    if (extFile === ".md") {
      console.log("es un archivo .md").then(res => {
        resolve(res);
      });
    } else {
      reject(
        "El archivo ingresado no es extensión .md, intente otro archivo o directorio"
      );
    }
  });
};


new Promise((resolve, reject) => {
  if (options[0] === undefined && options[1] === undefined) {
    isFileOrDirectory(pathToFile)
      .then(links => {
        resolve(links);
      })
      .catch(err => {
        reject(err);
      });
  }
});
//};