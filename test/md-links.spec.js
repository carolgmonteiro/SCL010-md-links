//importar funciones de md-links
const mdLinks = require("../md-links.js");


//paths para testear
let filePath = "TESTE1.md";
let dirPath =
  "C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md";

let options = undefined;

describe("mdLinks", () => {
  //testeando H01 USUARIO INGRESA RUTA
  it("deberia ser una función", () => {
    expect(typeof mdLinks).toBe("function");
    console.log("funcion");
  });


  // it('debería retornar la estadística del total de links y links únicos', () => {
  //   expect.assertions(1);
  //   return mdLinks(fileErr,["--stats",option2]).then(res => expect(res).toEqual(
  //     { Total: 3, Unique: 3, Broken: 2 }
  //   ));
  // });

  // it("deberia retornar error se la ruta no es válida", () => {
  //   console.log('ruta no valida');
  // });
  it("deberia retornar los links de una ruta que es un Directorio", () => {
    expect.assertions(0);
    return mdLinks(dirPath, options).then(res =>
      expect(res).toEqual(
        [{
            href: 'https://nodejs.org/',
            file: 'C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md\\TESTE.md',
            text: 'Node.js'
          },
          {
            href: 'https://docs.npmjs.com/misc/scripts',
            file: 'C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md\\TESTE.md',
            text: 'npm-scripts'
          },
          {
            href: 'https://semver.org/',
            file: 'C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md\\TESTE.md',
            text: 'semver'
          },
          {
            href: 'https://semver.org/shjaHhsajhdjkas',
            file: 'C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md\\TESTE.md',
            text: 'teste 01'
          },
          {
            href: 'https://semver.org/shjaH',
            file: 'C:\\Users\\carol\\OneDrive\\Área de Trabalho\\GitDescarga\\SCL010-md-links\\archivos-test-md\\TESTE.md',
            text: 'teste 02'
          }
        ]
      )
    );
    // console.log('es directorio');
  });

  // it("deberia retornar que es un archivo con el path TESTE.md", () => {
  //   console.log('es archivo');
  // });
  // //testeando H02 ES UN ARCHIVO
  // it("deberia retornar ERR se el archivo NO es .md", () => {
  //   console.log('no es archivo .md');
  // });
  // it("deberia retornar el archivo .md", () => {
  //   console.log('es archivo .md');
  // });
  // //testeando H03 LEE EL ARCHIVO Y RETORNA RUTA Y LINKS
  // it("deberia retornar ERR se NO hay links retorna mensaje “no hay links”", () => {
  //   console.log('no es archivo .md');
  // });
  // it("deberia retornar se hay links retorna los links", () => {
  //   console.log('es archivo .md');
  // });
  // //testeando H04 VALIDATE
  // it("deberia retornar OK para los links que estan bien en el archivo .md", () => {
  //   console.log('OK');
  // });
  // it("retornar FAIL para los links que estan rotos en el archivo .md", () => {
  //   console.log('FAIL');
  // });
  // //testeando H05 STATS
  // it("deberia retornar cuantos links hay en total el archivo .md", () => {
  //   console.log("TOTAL");
  // });
  // it("deberia retornar cuantos links son únicos el archivo .md", () => {
  //   console.log('UNIQUE');
  // });
});
