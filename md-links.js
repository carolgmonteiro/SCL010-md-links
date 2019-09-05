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
const chalk = require("chalk");

let links = [];
let totalLinks = 0;
let uniqueLinks = 0;

//FUNCION MADRE CON LAS OPCIONES DE MDLINKS
const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate === true && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsValidateOption(res)
          .then(res => {
            resolve(res);
            //console.log("V+S:", res)
            console.log(chalk.bold.yellow("VALIDATE + STATS RESULT:" + "\n"));
          });
      });
    } else if (options.validate === false && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsOption(res).then(res => {
          resolve(res);
          console.log(chalk.bold.yellow("STATS LINKS RESULT:" + "\n"));
          //console.log("STATS", res);
        });
      });
    } else if (options.validate === true && options.stats === false) {
      isFileOrDirectory(path).then(links => {
        validateOption(links).then(res => {
          resolve(res);
          console.log(chalk.bold.yellow("VALIDATE LINKS RESULT:" + "\n"));
          //console.log("VALIDATE:", res);
        });
      });
    } else if (options.validate === false && options.stats === false) {
      isFileOrDirectory(path)
        .then(res => {
          resolve(res);
          console.log(chalk.bold.yellow("LINKS SEARCH RESULT:" + "\n"));
          //console.log("SIN OPCION:", res);
        })
        .catch(err => {
          reject(err);
          // console.log("Choose an option: No option | --validate or --v | --stats or --s  | --validate --stats or --v --s");
        });
    } else {
      reject(
        err
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
          err
        );
      } else if (stats.isDirectory()) {
        //console.log(chalk.bold("It is a directory"));
        resolve(goDirectory(path));
      } else {
        resolve(goMdFile(path));
      }
    });
  });
};

// Imprime en terminal los archivos que concuerden con la extención del formato markdown ".md".
const goDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fileHound.create()
      .discard("node_modules")
      .paths(path)
      .ext(".md")
      .find()
      .then(res => (res.forEach(file => {
        if (file.length != 0) {
          console.log("We have found .md files at: " + file);
          resolve(readMdFile(file));
        }
      })))
      .catch(err => {
        reject(new Error("Path it is not valid"));
      })
  })
};
//FUNCION PARA BUSCAR LOS ARCHIVOS .MD
const goMdFile = file => {
  let extFile = path.extname(file);
  if (extFile === ".md") {
    //console.log("es un archivo .md");
    return readMdFile(file);
  } else {
    console.log(chalk.bgRed("This is not an .md extention file, try another file or directory" + "\n"));
  }
};

//FUNCIÓN PARA LEER LOS ARCHIVOS .MD Y VERIFICAR SI HAY LINKS
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
          console.log(chalk.bold.red("We haven´t found any links at: ") + chalk.red.underline(file));
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
      total: totalLinks,
      unique: uniqueLinks
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
          // link.response = res.statusText;
          link.response = "O.K.";
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
      let linksOk = (statusLinks.toString().match(/O.K./g)).length;
      //console.log("linksOk", linksOk);
      let brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
      //console.log("linksBroken:", brokenLinks);
      let statsResult = {
        total: totalLinks,
        unique: uniqueLinks,
        ok: linksOk,
        broken: brokenLinks
      };
      resolve(statsResult);
      //console.log("STATS RESULT:", statsResult);
    }).catch(err => {
      reject(err)
    })
  })
}

//exporta función madre mdLinks para index.js
module.exports = mdlinks;
