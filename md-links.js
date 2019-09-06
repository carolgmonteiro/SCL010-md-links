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
let brokenLinks = 0;

//FUNCION MADRE CON LAS OPCIONES DE MDLINKS
const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate === true && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsValidateOption(res)
          .then(res => {
            resolve(res);
            //console.log("V+S:", res)
            console.log(chalk.bold.white("VALIDATE + STATS RESULT:" + "\n"));
          });
      });
    } else if (options.validate === false && options.stats === true) {
      isFileOrDirectory(path).then(res => {
        statsOption(res).then(res => {
          resolve(res);
          console.log(chalk.bold.white("STATS LINKS RESULT:" + "\n"));
          //console.log("STATS", res);
        });
      });
    } else if (options.validate === true && options.stats === false) {
      isFileOrDirectory(path).then(links => {
        validateOption(links).then(res => {
          resolve(res);
          console.log(chalk.bold.white("VALIDATE LINKS RESULT:" + "\n"));
          //console.log("VALIDATE:", res);
        });
      });
    } else if (options.validate === false && options.stats === false) {
      isFileOrDirectory(path)
        .then(res => {
          resolve(res);
          console.log(chalk.bold.white("LINKS SEARCH RESULT:" + "\n"));
          //console.log("SIN OPCION:", res);
        })
        .catch(err => {
          reject(err);
          console.log(chalk.bold.red("Path not valid, please choose another one and choose an option: No option | --validate or --v | --stats or --s  | --validate --stats or --v --s"));
        });
    } else {
      reject(
        console.log("ruta no valida")
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
        // Taken from https://github.com/markedjs/marked/issues/1279
        let linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
        marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
        marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
        marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
        renderer.link = function (href, title, text) {
          // Remove image size at the end, e.g. ' =20%x50'
          href = href.replace(/ =\d*%?x\d*%?$/, "");
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
        if (res.status === 200) {
          link.status = res.status;
          link.response = "O.K.";
          //console.log("LINK O.K.", link.response);
        } else {
          link.status = res.status;
          link.response = res.statusText;
          link.response = "FAIL";
          //console.log("LINK FAIL", link.response);
        }
      });
    });
    Promise.all(statusLinks).then(res => {
      resolve(links);
      //console.log("VALIDATE:", links);
    }).catch(err => {
      links.status = null;
      links.response = "FAIL";
      resolve(links);
      //console.log("catch:", links);
    });
  });
};

const statsValidateOption = (links) => {
  return new Promise((resolve, reject) => {
    validateOption(links).then(link => {
      let allLinks = link.map(link => link.href);
      let statusLinks = links.map(link => link.response);
      //console.log("statusLinks:", statusLinks);
      let totalLinks = allLinks.length;
      //console.log("totalLinks:", totalLinks);
      uniqueLinks = [...new Set(allLinks)];
      //console.log("uniqueLinks:", uniqueLinks);
      brokenLinks += (statusLinks.toString().match(/FAIL/g));
      //console.log("brokenLinks:", brokenLinks);
      let statsResult = {
        total: totalLinks,
        unique: uniqueLinks.length,
        broken: brokenLinks.length
      }
      //console.log("STATS RESULT 2:", statsResult);
      if (brokenLinks === 0) {
        statsResult = {
          total: totalLinks,
          unique: uniqueLinks.length,
          broken: 0
        }
        resolve(statsResult);
      } else {
        brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
        let statsResult = {
          total: totalLinks,
          unique: uniqueLinks.length,
          broken: brokenLinks
        }
        resolve(statsResult);
        //console.log("STATS RESULT:", statsResult);
      }
    }).catch(err => {
      reject(err)
      console.log(chalk.bold.red("ERROR VALIDATE STATS OPTION. TRY AGAIN"));
    })
  })
}

//exporta función madre mdLinks para index.js
module.exports = mdlinks;
