# Md-Links | Libreria para extraer links de archivos Markdown

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

La libreria, que está en el idioma inglés, fue creada usando [Node.js](https://nodejs.org/), e su función es leer y analizar archivos en formato `Markdown` desde el input de un unico archivo hasta un directorio. Extrae links de los archivos y los verifica el status de los links y saca estadísticas cómo total de links, links que no funcionan y unicos.

# Guía de Uso e Instalación

## Instalación

Con el comando `npm i @carolgmonteiro/md-links` podemos instalar directamente. Ver [docs oficiales de `npm install` acá](https://docs.npmjs.com/cli/install).

```
npm i @carolgmonteiro/md-links
```

## Como usar

En el archivo JS:

```js
const mdlinks = require("md-links");
```

---

**Cómo llamar a libreria desde la terminal:**

- Para path-to-file igual a un Directorio

```
md-links <"path-to-directory"> [options]
```

- Para path-to-file igual a un archivo

```
md-links <"path-to-file"> [options]
```

---

**CLI (Command Line Interface)**

La libreria hace las seguientes entregas:

**1.** El usuario no elije ninguna opción y recibe los links extraiedos de los archivos analizados

**2.** Elije las opciones disponibles:

- **stats** (dados estadisticos de los links)
- **validate** (status de los links en la red)
- **stats validate** (dados estadisticos del status de los links)

**PATH**

- Leer archivos con extensión .md

`md-links <file.md>`

<a href="https://ibb.co/vX65CRN"><img src="https://i.ibb.co/8YL3nty/SIN-OP-FILE.png" alt="SIN-OP-FILE" border="0"></a>

- Leer un directorio

`md-links <"path-to-directory">`

<a href="https://ibb.co/KxdF3TL"><img src="https://i.ibb.co/Zz5WkqY/SIN-OP-DIRECTORY.png" alt="SIN-OP-DIRECTORY" border="0"></a>

En ambos casos, se obtiene como resultado:

- `file`: archivo o ruta donde fue encontrado el link.
- `text`: descripción del link.
- `href`: link encontrado.

**OPTIONS**

**--validate**

Entrega la validacion o status de los links (status: 200, 300, 404, 500 etc).

Usar así `md-links <"path-to-file"> --stats`

<a href="https://ibb.co/8KtLrWf"><img src="https://i.ibb.co/3rQ9pDj/VALIDATE-OP-FILE.png" alt="VALIDATE-OP-FILE" border="0"></a>

**--stats**

Entrega las seguientes estadísticas de los links:
`Total -` el total de links encontrados;
`Unique -` el total de links unicos.

Usar así
`md-links <"path-to-directory"> --stats --validate`
`md-links <"path-to-file"> --stats`
`--stats` | `--s`

<a href="https://ibb.co/Y3w8SWv"><img src="https://i.ibb.co/MsQpHhq/STATS-OP-FILE.png" alt="STATS-OP-FILE" border="0"></a>

**--stats --validate**

Entrega las seguientes estadísticas de los links:
`Total -` el total de links encontrados;
`Unique -` el total de links unicos.
`Broken -` el total de links rotos;

Usar así
`md-links <"path-to-directory"> --stats --validate`
`md-links <"path-to-file"> --stats --validate`
`--stats --validate` | `--validate --stats` | `--s --v` | `--v --s`

<a href="https://ibb.co/rdH9rKH"><img src="https://i.ibb.co/2ZdJ40d/STATS-VALIDATE-OP-FILE.png" alt="STATS-VALIDATE-OP-FILE" border="0"></a>

---

## Documentación técnica

### Dependencias:

- node.js versión 11
- "chalk": "^2.4.2"
- "fetch": "^1.1.0"
- "filehound": "^1.17.3"
- "marked": "^0.7.0",
- "node-fetch": "^2.6.0"
- "eslint": "^6.2.1",
- "eslint-plugin-jest": "^22.15.2",
- "jest": "^24.9.0"

---

### Planificación:

**Diagrama de Flujo**

<a href="https://ibb.co/VCpKJ9R"><img src="https://i.ibb.co/myFxbTk/Slide2.png" alt="Slide2" border="0"></a>

**Trello**

El board con el backlog de la implementación de la librería puede ser encontrado [aquí.](https://trello.com/b/igGvDu6L)
<a href="https://ibb.co/gWFSKFy"><img src="https://i.ibb.co/JpFvJFn/Slide11.png" alt="Slide11" border="0"></a>

**Milestones del proyecto**

El proyecto fue ordenado en milestones en trello, recorriendo cada parte del diagrama de flujo

<a href="https://ibb.co/vdFJ7c5"><img src="https://i.ibb.co/8xCjWm3/Slide3.png" alt="Slide3" border="0"></a>
<a href="https://ibb.co/vzVjB3x"><img src="https://i.ibb.co/F7mDW5b/Slide4.png" alt="Slide4" border="0"></a>
<a href="https://ibb.co/FDSXQ8k"><img src="https://i.ibb.co/CHk6jVp/Slide5.png" alt="Slide5" border="0"></a>
<a href="https://ibb.co/dpWj6s5"><img src="https://i.ibb.co/wQ0BCZz/Slide6.png" alt="Slide6" border="0"></a>
<a href="https://ibb.co/9NWFsvK"><img src="https://i.ibb.co/t4D78hj/Slide7.png" alt="Slide7" border="0"></a>
<a href="https://ibb.co/rxxS31L"><img src="https://i.ibb.co/jyy2z1x/Slide8.png" alt="Slide8" border="0"></a>
<a href="https://ibb.co/SVkQ5nP"><img src="https://i.ibb.co/nQX36cb/Slide9.png" alt="Slide9" border="0"></a>
<a href="https://ibb.co/XCPzxPk"><img src="https://i.ibb.co/rwhZ2hf/Slide10.png" alt="Slide10" border="0"></a>
<a href="https://ibb.co/QfPyH9G"><img src="https://i.ibb.co/rmxDpkJ/Slide11.png" alt="Slide11" border="0"></a>
<a href="https://ibb.co/jZTJjwK"><img src="https://i.ibb.co/prxhkKD/Slide12.png" alt="Slide12" border="0"></a>

---

## Autora

[Carolina Guido Monteiro](https://github.com/carolgmonteiro)
Desarrolladora Front-end

---
