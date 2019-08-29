#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const marked = require("marked");
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
// let firstOption = process.argv[3];
// console.log("FIRST OP:", firstOption);
// let secondOption = process.argv[4];
// console.log("SECOND OP:", secondOption);
//ruta absoluta para relativa
pathToFile = path.resolve(pathToFile);
console.log("PATH RESOLVE:", pathToFile);
pathToFile = path.normalize(pathToFile);
console.log("PATH NORMALIZE:", pathToFile);
// let links = [];
//opciones
// let options = {
//   validate: false,
//   stats: false
// };
// if (
//   (firstOption === "--validate" && secondOption === "--stats") ||
//   (firstOption === "--v" && secondOption === "--s")
// ) {
//   options.validate = true;
//   options.stats = true;
// } else if (firstOption === "--validate" || firstOption === "--v") {
//   options.validate = true;
//   option.stats = false;
// } else if (firstOption === "--stats" || firstOption === "--s") {
//   options.validate = false;
//   options.stats = true;
// }
// else {
//   console.log("Opción no valida");
// }

const isFileOrDirectory = path => {
  fs.lstat(path, (err, stats) => {
    if (err) {
      console.log("Encontramos un error: la ruta no es valida");
    } else if (stats.isDirectory()) {
      console.log("es directorio");
      // return goDirectory(path);
    } else {
      console.log("es archivo");
      return goMdFile(path);
    }
  });
};

// const goDirectory = (path) => {
//   return new Promise((resolve, reject) => {
//     fileHound
//       .create()
//       .discard("node_modules") //saca la carpeta
//       .paths(path)
//       .ext("md")
//       .find((err, files) => {
//         if (files.length === 0) {
//           console.log(err);
//           reject("Lamentablemente no hay archivo .md en este directorio");
//         }
//       })
//       .then(files => {
//         resolve(files);
//       });
//   });
// };

const goMdFile = file => {
  let extFile = path.extname(file);
  if (extFile === ".md") {
    console.log("es un archivo .md");
    readMdFile(file);
  } else {
    console.log(
      "El archivo ingresado no es extensión .md, intente otro archivo o directorio"
    );
  }
};

const readMdFile = file => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let links = [];
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        links.push({
          href: href,
          file: file,
          text: text
        });
      };
      marked(data, { renderer: renderer });
      printLinks(links);
      return links;
    }
  });
};

const printLinks = links => {
  console.log("LINKS PRINT:", links);
};

// const validate = links => {
//   console.log("LINKS PRINT:", links);
// };

const mdlinks = path => {
  isFileOrDirectory(path);
};
mdlinks(pathToFile);
// const mdlinks = (path) => {
//   new Promise((resolve, reject) => {
//     if (options[0] === undefined && options[1] === undefined) {
//       isFileOrDirectory(path)
//         .then(links => {
//           resolve(links);
//         })
//         .catch(err => {
//           reject(err);
//         });
//     }
//   });
// };
