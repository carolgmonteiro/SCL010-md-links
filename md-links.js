#!/usr/bin/env node

//muestra las opciones para el usuario
const commander = require('commander');
const program = new commander.Command();
program.version('0.0.1');
//busca los archivos
const fs = require("fs");
const path = require("path");
//lee los archivos
const marked = require("marked");
//para hacer petición url
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;
//para leer directorio
const fileHound = require("fileHound");

let pathToFile = process.argv[2];
console.log("PATH:", pathToFile);
// let firstOption = process.argv[3];
// console.log("FIRST OP:", firstOption);
// let secondOption = process.argv[4];
// console.log("SECOND OP:", secondOption);

// //opciones de md.links
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

// //da las opciones para el usuario
// program
//   .option('-s, --stats', 'Recibe estadísticas de los links TOTAL y UNIQUES')
//   .option('-v, --validate', 'Recibe los links con sus status');

// program.parse(process.argv);

// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);

//ruta absoluta para relativa
pathToFile = path.resolve(pathToFile);
console.log("PATH RESOLVE:", pathToFile);
pathToFile = path.normalize(pathToFile);
console.log("PATH NORMALIZE:", pathToFile);


const isFileOrDirectory = (path) => {
  fs.lstat(path, (err, stats) => {
    if (err) {
      console.log("Encontramos un error: la ruta o archivo no es valido");
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
    let links = [];
    if (err) {
      console.log(err);
    } else if (links.length === 0) {
      console.log("Oh! No hay links en este archivo");
    } else {
      const renderer = new marked.Renderer();
      renderer.link = function (href, title, text) {
        links.push({
          href: href,
          file: file,
          text: text
        });
      };
      marked(data, {
        renderer: renderer
      });
      validateOption(links);
      return links;
    }
  });
};

// //hacer una petición de la URL para que devuelva el status
// fetchUrl("https://www.instagram.com", function (error, meta, body) {
//     console.log("HTTP STATUS:", meta.status);
//     console.log("FINAL URL:", meta.finalUrl);
// });

// const printLinks = links => {
//   console.log("LINKS PRINT:", links);
// };

const validateOption = (links) => {
  // console.log("LINKS:", links);
  links.forEach(link => {
    console.log("LINKS:", link.href);
    fetchUrl(link.href, function (error, meta, body) {
      if (meta.status > 399) {
        console.log("URL:", meta.finalUrl);
        console.log("STATUS: FAIL", meta.status);
      } else {
        console.log("URL:", meta.finalUrl);
        console.log("STATUS: OK", meta.status);
      }
    })
  })
};

// const statusOption = (links) => {
//   let allLinks = links.forEach(link => {
//     console.log("LINKS:", link.href);
//   });
//   let totalLinks = allLinks.length;

// }


//Validar los links
// const validate = links => {
//   console.log("LINKS PRINT:", links);
// };

//Estadistica de links

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