#!/usr/bin/env node

//importar funciones de md-links
const mdLinks = require("./md-links.js");

//para obtener rutas de archivos
const path = require("path");
const chalk = require("chalk");

let pathToFile = process.argv[2];
console.log(chalk.bold.inverse("FILE: ") + chalk.bold.inverse(pathToFile));

//transforma ruta absoluta en relativa
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);
console.log(chalk.bold("FILE PATH: ") + chalk.underline.blue(pathToFile));
//console.log("PATH:", pathToFile);

let firstOption = process.argv[3];
let secondOption = process.argv[4];

//Let con las opciones para md-links
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

mdLinks(pathToFile, options).then(links => {
    if (options.validate === false && options.stats === false) {
      links.map(link => {
        console.log(chalk.inverse.yellow("FILE:") + chalk.yellow(link.file) + "\n" + chalk.inverse("TEXT:") + chalk.bold(link.text) + "\n" + chalk.inverse.blue("HREF:") + chalk.underline.blue(link.href))
      });
    } else if (options.validate === true && options.stats === true) {
      console.log(chalk.bold.inverse("TOTAL LINKS:") + chalk.bold.inverse(links.total) + " " + chalk.bold.bgCyan("UNIQUE LINKS:") + chalk.bold.bgCyan(links.unique) + " " + chalk.bold.bgRed("BROKEN LINKS:") + chalk.bold.bgRed(links.broken));
    } else if (options.validate === true && options.stats === false) {
      links.map(link => {
        if (link.response === "O.K.") {
          console.log(chalk.inverse("FILE:") + " " + chalk.white(link.file) + " " + chalk.bgGreen("STATUS:") + " " + chalk.bgGreen(link.response) + " " + chalk.bgGreen(link.status) + " " + chalk.green("LINK:") + " " + chalk.bold.green(link.text) + " " + chalk.underline.green(link.href));
        } else if (link.response === "FAIL") {
          console.log(chalk.inverse("FILE:") + " " + chalk.white(link.file) + " " + chalk.bgRed("STATUS:") + " " + chalk.bgRed(link.response) + " " + chalk.bgRed(link.status) + " " + chalk.red("LINK:") + " " + chalk.bold.red(link.text) + " " + chalk.underline.red(link.href));
        }
      })
    } else if (options.validate === false && options.stats === true) {
      console.log(chalk.bold.inverse("TOTAL LINKS:") + chalk.bold.inverse(links.total) + " " + chalk.bold.bgCyan("UNIQUE LINKS:") + chalk.bold.bgCyan(links.unique));
    }
  })
  .catch(err => {
    console.log(chalk.magenta(err))
  });
