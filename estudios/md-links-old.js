#!/usr/bin/env node

//muestra las opciones para el usuario
// const commander = require('commander');
// const program = new commander.Command();
// program.version('0.0.1');
//busca los archivos
const fs = require("fs");
const path = require("path");
//lee los archivos
const marked = require("marked");
//para hacer petición url
// const fetch = require("fetch");
const fetch = require("node-fetch");
// const fetchUrl = fetch.fetchUrl;
//para leer directorio
const fileHound = require("fileHound");

let pathToFile = process.argv[2];
console.log("PATH:", pathToFile);
let links = [];
let totalLinks = 0;
let uniqueLinks = 0;
// let brokenLinks = 0;
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

//ruta absoluta para relativa
pathToFile = path.resolve(pathToFile);
console.log("PATH RESOLVE:", pathToFile);
pathToFile = path.normalize(pathToFile);
console.log("PATH NORMALIZE:", pathToFile);


const isFileOrDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(console.log("Encontramos un error: la ruta o archivo no es valido"));
      } else if (stats.isDirectory()) {
        console.log("es directorio");
        // return goDirectory(path);
      } else {
        resolve(goMdFile(path));
      }
    });
  })
};


const goMdFile = file => {
  let extFile = path.extname(file);
  if (extFile === ".md") {
    console.log("es un archivo .md");
    return readMdFile(file);
  } else {
    console.log(
      "El archivo ingresado no es extensión .md, intente otro archivo o directorio"
    );
  }
};

//función para leer los archivos .md y verificar si hay links
const readMdFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
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
        // if (links.length === 0) {
        //   console.log("Oh! No hay links en este archivo, intente otro");
        // } else {
        //   // console.log("links del archivo:", links.length);
        // validateOption(links);
        // statsOption(links);
        //   // console.log("recebe:", links);
        // }
        resolve(links);
      }
    });
  })
};

//función para validar el status de cada link del archivo
const validateOption = (links) => {
  //console.log("LINKS:", links);
  linksValidate = [];
  return Promise.all(links.map(link => {
    return new Promise((resolve, reject) => {

      // links.map(link => {
      fetch(link.href).then(res => {
        if (res.status > 299) {
          link.status = res.status;
          link.response = "FAIL";
          resolve(link);
          linksValidate.push(link);
        }
        //else {
        //     link.status = res.status;
        //     link.response = res.statusText;
        //     resolve(link);
        //     console.log("LINK OK:", link);
        //   }
        // })
        // .catch(err => {
        //   link.status = null;
        //   link.response = "FAIL";
        //   resolve(link);
        //   console.log("ERR:", link);
        // });
        //console.log("LINK FAIL llalalla:", myLinks);
        resolve(linksValidate);
      })
    });
  }));
};

const statsOption = (links) => {
  console.log("aaaaaaaaaaaaaaaaaaa", links)
  return new Promise((resolve, reject) => {
    let allLinks = links.map(link => link.href);
    let broken = [];
    let brokenLinks = 0;
    totalLinks += allLinks.length;
    uniqueLinks += [...new Set(allLinks)].length;
    console.log("UNIQUE LINKS:", uniqueLinks);
    links.filter(link => {
      console.log("LINK::", link);
      if (link.status > 299) {
        broken.push(link.status);
        console.log("BROKEN:", broken.length);
        brokenLinks += broken.length;
        console.log("BROKEN LINKS:", brokenLinks);
      };
    });
    let statsResult = {
      Total: totalLinks,
      Unique: uniqueLinks,
      Broken: broken.length
    };
    resolve(statsResult);
    console.log("STATS RESULT:", statsResult);
  })
};



// //Funcion MDLINKS (hub para las otras)
// const mdlinks = (path) => {
//   isFileOrDirectory(path)
// };


const mdlinks = (path) => {
  let links;
  return new Promise((resolve, reject) => {
    isFileOrDirectory(path)
      .then(res => {
        validateOption(res)
          .then(res => {
            resolve(res)
            console.log("ccccccccccccccccccc", res)
          })

      })
    // validateOption(links)
    // .then(res => {
    //   statsOption(res)
    //     .then(res => {
    //       resolve(res);
    //     });
    // });
  });
};

mdlinks(pathToFile);