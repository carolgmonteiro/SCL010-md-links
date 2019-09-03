//habito de poner el mismo nombre en la constante del modulos q esta llamando
// const os = require("os");
// console.log(os.platform());
// console.log(os.release());
// console.log("free mem:", os.freemem(), "bytes");
// console.log("total mem:", os.totalmem(), "bytes");

const mdlinks = (path, firstOption, secondOption) => {
  console.log("RES:", options);
  return new Promise((resolve, reject) => {
    if (firstOption === undefined && secondOption === undefined) {
      isFileOrDirectory(path)
        .then(res => {
          resolve(res);
          console.log("STATS", res);
        })
        .catch(err => {
          reject(err);
          console.log("OPCION ERR:", err);
        });
    }

    const path = require("path");
    //pone colores en linea de comando
    const chalk = require("chalk");
    //leer los archivos / verificar se existe
    const fs = require('fs');
    //para crear el servicio
    const http = require("http");
    const fileHound = require("fileHound");

    //función para imprimir los links (debe ir en index.js) usar chalk
    // const printMdLinks = links => {
    //   console.log("LINKS PRINT:", links);
    // };



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

    // } else if (
    //   (firstOption === "--validate" && secondOption === "--stats") ||
    //(firstOption === "--v" && secondOption === "--s") || (firstOption === "--stats" && secondOption === "--validate") ||
    //(firstOption === "--s" && secondOption === "--v")
    // ) {
    //   isFileOrDirectory(path)
    //     .then(res => {
    //       validateOption(res)
    //         .then(res => {
    //           statsOption(res);
    //           then(res => {
    //             resolve(res);
    //             console.log("V + S", res);
    //           });
    //         });
    //     });
    // } else if (options[0] === "--validate" || options[0] === "--v") {
    //   isFileOrDirectory(path)
    //     .then(res => {
    //       validateOption(res)
    //         .then(res => {
    //           resolve(res);
    //           console.log("VALIDATE", res);
    //         });
    //     });
    //}
    else if (firstOption === "--stats" || firstOption === "--s") {
      isFileOrDirectory(path)
        .then(res => {
          statsOption(res)
            .then(res => {
              resolve(res);
              console.log("STATS", res);
            })
            .catch(err => {
              reject(err);
              console.log("OPCION ERR:", err);
            });
        });
    } else {
      reject("Opción no encontrada. Elija: OP01: --validate o --v, OP02: --stats o --s,  OP03: --validate --stats o --v --s");
    }
  });
};



//console.log("LINKS:", links);
/* linksValidate = [];
links.forEach(link => {
  fetch(link.href)
    .then(res => {
      link['status'] = res.status
      console.log("LINK:", link)
    })
}); */


//criar archivo y leerlos 
// const fs = require("fs");
//con callback codigo assincrono
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

// //consulta en la base de datos
// const users = query("SELECT * FROM users");
// query("SELECT * FROM users", function (err, users) {
//     if (err) {
//         console.log(err);
//     }
//     if (users) {

//     }
// });

//peticion HTTP d elos clientes e tener respuestas del servidor
const http = require("http");

// // const handleServer = 
// http.createServer(function (req, res) {
//     res.writeHead(404, {
//         "Content-type": "text/html"
//     });
//     res.write("<h1>Hola mundo desde Node<h1>");
//     res.end();
// }).listen(3000);

// http.createServer(handleServer).listen(3000);

let myFirstPromise = Promise.resolve("Hola Mundo");

myFirstPromise.then(response => {
  console.log(response)
});

let mySecondPromise = newPromise((resolve, reject) => {
  setTimeout(() => resolve(5), 200)
});

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

const statsOption = (links) => {
  let allLinks = links.map(link => link.href);
  console.log("ALL LINKS:", allLinks);
  let broken = [];
  // let statsResult = {};
  let brokenLinks = 0;
  totalLinks += allLinks.length;
  console.log("TOTAL LINKS:", totalLinks);
  uniqueLinks += [...new Set(allLinks)].length;
  console.log("UNIQUE LINKS:", uniqueLinks);
  //let arrayResult = [];
  return new Promise((resolve, reject) => {
    console.log("LINKS:", link.href);
    fetch(allLinks).then(res => {
      console.log("PRUEBA:", allLinks.href);
      (res.forEach(link => {
        if (link.status > 299) {
          broken.push(link.status);
          resolve(link);
          console.log("LINK FAIL:", allLinks);
        }
        // brokenLinks = broken.length;
        // console.log("BROKEN LINKS:", brokenLinks);
        let statsResult = {
          total: totalLinks,
          unique: uniqueLinks,
          broken: brokenLinks
        };
        resolve(statsResult);
        arrayResult.push(statsResult);
        console.log("STATS RESULT:", statsResult);
      }))
    })
  });
};

const statsOption = (links) => {
  let allLinks = links.map(link => link.href);
  let broken = [];
  // let statsResult = {};
  let brokenLinks = 0;
  //console.log("ALL LINKS:", allLinks);
  totalLinks += allLinks.length;
  //console.log("TOTAL LINKS:", totalLinks);
  uniqueLinks += [...new Set(allLinks)].length;
  //console.log("UNIQUE LINKS:", uniqueLinks);
  //let arrayResult = [];
  return Promise.all(links.forEach(link => {
    //console.log("LINKS:", link.href);
    return new Promise((resolve, reject) => {
      fetch(link.href).then(res => {
        console.log("PRUEBA:", link.href);
        if (res.status > 299) {
          broken.push(res.status);
          resolve(link);
          console.log("LINK FAIL:", link);
        }
        brokenLinks = broken.length;
        console.log("BROKEN LINKS:", brokenLinks);
        let statsResult = {
          total: totalLinks,
          unique: uniqueLinks,
          broken: brokenLinks
        };
        resolve(statsResult);
        //arrayResult.push(statsResult);
        console.log("STATS RESULT:", statsResult);
      })
    })
  }));
};

const statsOption = (links) => {
  let allLinks = links.map(link => link.href);
  let broken = [];
  // let statsResult = {};
  let brokenLinks = 0;
  //console.log("ALL LINKS:", allLinks);
  totalLinks += allLinks.length;
  //console.log("TOTAL LINKS:", totalLinks);
  uniqueLinks += [...new Set(allLinks)].length;
  //console.log("UNIQUE LINKS:", uniqueLinks);
  let returnArray = []
  Promise.all(links.forEach(link => {
    //console.log("LINKS:", link.href);
    return new Promise((resolve, reject) => {
      fetch(link.href).then(res => {
        if (res.status > 299) {
          broken.push(res.status);
          resolve(link);
          console.log("LINK FAIL:", link);
        }
        brokenLinks = broken.length;
        console.log("BROKEN LINKS:", brokenLinks);
        let statsResult = {
          total: totalLinks,
          unique: uniqueLinks,
          broken: brokenLinks
        };
        returnArray.push(statsResult);
        resolve(returnArray);
        //console.log("STATS RESULT:", statsResult);
      })
    })
  }));
};




// links.filter(link => {
//   if (link.response.statusCode > 299) {
//     brokenLinks += [broken.push(link.response)].length;
//   };
//   return brokenLinks;
// })
// // console.log("BROKEN LINKS:", brokenLinks);
// const statsOption = (links) => {
//     return new Promise((resolve, reject) => {
//         let allLinks = links.map(link => link.href);
//         let broken = [];
//         let brokenLinks = 0;
//         totalLinks += allLinks.length;
//         uniqueLinks += [...new Set(allLinks)].length;
//         links.forEach(link => {
//             fetch(link.href).then(res => {
//               if (res.status > 299) {
//                 link.status = res.status;
//                 link.response = "FAIL";
//                 resolve(link);
//                 console.log("LINK FAIL:", link);
//               }
//             })
//             let statsResult = {
//               Total: totalLinks,
//               Unique: uniqueLinks,
//               Broken: broken.length
//             };
//             resolve(statsResult);
//             console.log("STATS RESULT:", statsResult);
//           }
//           //console.log("UNIQUE LINKS:", uniqueLinks);
//           // links.filter(link => {
//           //   console.log("LINK::", link);
//           //   if (link.status > 299) {
//           //     broken.push(link.status);
//           //     console.log("BROKEN:", broken.length);
//           //     brokenLinks += broken.length;
//           //     console.log("BROKEN LINKS:", brokenLinks);
//           //   };
//           // });

//         });
//     };

// const validateOption = (links) => {

//   // console.log("LINKS:", links);
//   links.forEach(link => {
//     //console.log("LINKS:", link.href);
//     fetchUrl(link.href, function (error, meta, body) {
//       if (meta.status > 299) {
//         linksFail.push({
//           url: meta.finalUrl,
//           status: meta.status
//         })
//         console.log("linksFail:", linksFail);
//         return linksFail;
//         // console.log("URL:", meta.finalUrl);
//         // console.log("STATUS: FAIL", meta.status);
//       } else {
//         linksOk.push({
//           url: meta.finalUrl,
//           status: meta.status
//         })
//         // console.log("URL:", meta.finalUrl);
//         // console.log("STATUS: OK", meta.status);
//         console.log("linksOK:", linksOk);
//         return linksOk;
//       }
//     })
//   })
//   // let validateResult = {
//   //   linksOK: linksOk,
//   //   linksFail: linksFail
//   // }
//   // console.log(validateResult);
// };


// const statsOption = (links) => {
//   let allLinks = links.map(link => link.href);
//   let broken = [];
//   // let statsResult = {};
//   let brokenLinks = 0;
//   //console.log("ALL LINKS:", allLinks);
//   totalLinks += allLinks.length;
//   //console.log("TOTAL LINKS:", totalLinks);
//   uniqueLinks += [...new Set(allLinks)].length;
//   //console.log("UNIQUE LINKS:", uniqueLinks);
//   return Promise.all(links.forEach(link => {
//     //console.log("LINKS:", link.href);
//     return new Promise((resolve, reject) => {
//       fetchUrl(link.href, function (error, meta, body) {
//         if (meta.status > 299) {
//           broken.push(meta.finalUrl);
//           console.log("BROKEN:", broken.length);
//         };
//         brokenLinks = broken.length;
//         console.log("BROKEN LINKS:", brokenLinks);
//         let statsResult = {
//           total: totalLinks,
//           unique: uniqueLinks,
//           broken: brokenLinks
//         };
//         resolve(statsResult);
//         console.log("STATS RESULT:", statsResult);
//       })
//     })
//   }));
// };

// const statsOption = (links) => {
//   return new Promise((resolve, reject) => {
//     let allLinks = links.map(link => link.href);
//     let broken = [];
//     let brokenLinks = 0;
//     totalLinks += allLinks.length;
//     uniqueLinks += [...new Set(allLinks)].length;
//     //console.log("UNIQUE LINKS:", uniqueLinks);
//     return Promise.all(links.forEach(link => {
//       //console.log("LINKS:", link.href);
//       fetchUrl(link.href, function (error, meta, body) {
//         if (meta.status > 299) {
//           broken.push(meta.finalUrl);
//           console.log("BROKEN:", broken.length);
//         };
//         brokenLinks = broken.length;
//         console.log("BROKEN LINKS:", brokenLinks);
//         let statsResult = {
//           total: totalLinks,
//           unique: uniqueLinks,
//           broken: brokenLinks
//         };
//         resolve(statsResult);
//         console.log("STATS RESULT:", statsResult);
//       })
//     }))
//   });
// };
