#!/usr/bin/env node

//importar funciones de md-links
const mdLinks = require("./md-links.js");

//para obtener rutas de archivos
const path = require("path");
const chalk = require("chalk");

let pathToFile = process.argv[2];
console.log(chalk.bold.inverse.white("\n" +
  " ---------------------------------------- MD-LINKS RESULT ---------------------------------------- "));
console.log(chalk.bold.white("Choose an option: ") + chalk.white("No option | --validate or --v | --stats or --s  | --validate --stats or --v --s") + "\n");

console.log(chalk.bold("FILE NAME: ") + chalk(pathToFile));

//transforma ruta absoluta en relativa
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);
console.log(chalk.bold("FILE PATH: ") + chalk.white(pathToFile) + "\n");
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

//para imprimir resultados
mdLinks(pathToFile, options)
  .then(links => {
    //Por defecto
    if (options.validate === false && options.stats === false) {
      links.map(link => {
        console.log(
          chalk.bold.inverse.white(" FILE:") +
          chalk.white(link.file) +
          "\n" +
          chalk.bold.bgBlue(" LINK:") +
          chalk.bold.blue("[" + link.text.substr(0, 50) + "]") +
          " " +
          // chalk.inverse.blue("HREF:") +
          chalk.underline.blue(link.href)
        );
      });
      //Opcion validate + stats
    } else if (options.validate === true && options.stats === true) {
      console.log("\n" +
        chalk.bold.inverse(" TOTAL LINKS: " + links.total + " ") +
        " " +
        chalk.bold.bgCyan(" UNIQUE LINKS:" + links.unique + " ") +
        " " +
        chalk.bold.bgRed(" BROKEN LINKS: " + links.broken + " ") + "\n"
      );
      //Opcion validate
    } else if (options.validate === true && options.stats === false) {
      links.map(link => {
        if (link.response === "O.K.") {
          console.log(
            chalk.bold.inverse("FILE:") +
            " " +
            chalk.white(link.file) +
            "\n" +
            chalk.bold.bgGreen(" STATUS:" + " " + link.status + " " + link.response + " ") +
            " " +
            chalk.bold.green("LINK:") +
            " " +
            chalk.bold.green("[" + link.text.substr(0, 50) + "]") +
            " " +
            chalk.underline.green(link.href)
          );
        } else if (link.response === "FAIL") {
          console.log(
            chalk.bold.inverse("FILE:") +
            " " +
            chalk.white(link.file) +
            "\n" +
            chalk.bold.bgRed(" STATUS:" + " " + link.status + " " + link.response + " ") +
            " " +
            chalk.bold.red(" LINK: ") +
            " " +
            chalk.bold.red("[" + link.text.substr(0, 50) + "]") +
            " " +
            chalk.underline.red(link.href)
          );
        }
      });
      //Opcion stats
    } else if (options.validate === false && options.stats === true) {
      console.log(
        chalk.bold.inverse(" TOTAL LINKS: ") +
        chalk.bold.inverse(links.total + " ") +
        " " +
        chalk.bold.bgCyan(" UNIQUE LINKS: ") +
        chalk.bold.bgCyan(links.unique + " ") + "\n"
      );
    }
  })
  .catch(err => {
    console.log(chalk.bold.red("We found an error: The path or file is not valid. Try again." + "\n"));
  });
