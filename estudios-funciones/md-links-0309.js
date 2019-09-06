#!/usr/bin/env node

//busca los archivos
const fs = require("fs");
const path = require("path");
//lee los archivos
const marked = require("marked");
//para hacer petición url
const fetch = require("node-fetch");
//para leer directorio
const fileHound = require("fileHound");

let pathToFile = process.argv[2];
console.log("PATH:", pathToFile);
let links = [];
let totalLinks = 0;
let uniqueLinks = 0;
let firstOption = process.argv[3];
let secondOption = process.argv[4];

//Let con las opciones para md.links
let options = {
  validate: false,
  stats: false
};
if (
  (firstOption === "--validate" && secondOption === "--stats") ||
  (firstOption === "--v" && secondOption === "--s") ||
  (firstOption === "--stats" && secondOption === "--validate") ||
  (firstOption === "--s" && secondOption === "--v")
) {
  options.validate = true;
  options.stats = true;
} else if (firstOption === "--validate" || firstOption === "--v") {
  options.validate = true;
  options.stats = false;
} else if (firstOption === "--stats" || firstOption === "--s") {
  options.validate = false;
  options.stats = true;
} else {
  options.validate = false;
  options.stats = false;
}

//transforma ruta absoluta en relativa
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);

//FUNCION MADRE CON LAS OPCIONES DE MDLINKS
const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate === true && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsValidateOption(res)
          .then(res => {
            resolve(res);
            console.log("Validate+Status:", res);
          });
      });
    } else if (options.validate === false && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsOption(res).then(res => {
          resolve(res);
          console.log("STATS", res);
        });
      });
    } else if (options.validate === true && options.stats === false) {
      isFileOrDirectory(path).then(links => {
        validateOption(links).then(res => {
          resolve(res);
          console.log("VALIDATE:", res);
        });
      });
    } else if (options.validate === false && options.stats === false) {
      isFileOrDirectory(path)
        .then(res => {
          resolve(res);
          console.log("SIN OPCION:", res);
        })
        .catch(err => {
          reject(err);
          console.log("OPCION ERR:", err);
        });
    } else {
      reject(
        "Opción no encontrada. Elija: OP01: --validate o --v, OP02: --stats o --s,  OP03: --validate --stats o --v --s"
      );
    }
  });
};

//FUNCION PARA FILTRAR SE ES ARCHIVO O DIRECTORIO
const isFileOrDirectory = path => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(
          console.log("Encontramos un error: la ruta o archivo no es valido")
        );
      } else if (stats.isDirectory()) {
        console.log("es directorio");
        // return goDirectory(path);
      } else {
        resolve(goMdFile(path));
      }
    });
  });
};

//FUNCION PARA BUSCAR LOS ARCHIVOS .MD
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
        if (links.length === 0) {
          console.log("Oh! No hay links en este archivo, intente otro");
        } else
          resolve(links);
      }
    });
  });
};

//Estadisticas de TOTAL y UNIQUES
const statsOption = links => {
  return new Promise((resolve, reject) => {
    let allLinks = links.map(link => link.href);
    totalLinks += allLinks.length;
    uniqueLinks += [...new Set(allLinks)].length;
    let statsResult = {
      Total: totalLinks,
      Unique: uniqueLinks
    };
    resolve(statsResult);
  });
};

//Validar los links con sus status
const validateOption = links => {
  //console.log("LINKS:", links);
  return new Promise((resolve, reject) => {
    let statusLinks = links.map(link => {
      // links.map(link => {
      return fetch(link.href).then(res => {
        if (res.status > 299) {
          link.status = res.status;
          link.response = "FAIL";
        } else {
          link.status = res.status;
          link.response = res.statusText;
          //console.log("LINK OK:", linksValidate);
        }
      });
    });
    Promise.all(statusLinks).then(res => {
      resolve(links);
      //console.log("VALIDATE:", links);
    });
  });
};

const statsValidateOption = (links) => {
  return new Promise((resolve, reject) => {
    validateOption(links).then(link => {
      let allLinks = link.map(link => link.href);
      let statusLinks = links.map(link => link.response);
      let totalLinks = statusLinks.length;
      //console.log("totalLinks:", totalLinks);
      let uniqueLinks = [...new Set(allLinks)].length;
      //console.log("uniqueLinks:", uniqueLinks);
      // let linksOk = statusLinks.toString().match(/OK/g);
      // console.log("linksOk", linksOk);
      let brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
      //console.log("linksBroken:", brokenLinks);
      let statsResult = {
        Total: totalLinks,
        Unique: uniqueLinks,
        Broken: brokenLinks
      };
      resolve(statsResult);
      //console.log("STATS RESULT:", statsResult);
    }).catch(err => {
      reject(err)
    })
  })
}



mdlinks(pathToFile, options);
