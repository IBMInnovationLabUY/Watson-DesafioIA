/**
 * Permite generar un archivo csv de formato "Titulo,Texto" para los artículos de Diario El País.
 * Dicho archivo se empleará como input para los Documentos empleados en WKS.
 * Obtención de notas desde: http://169.60.12.196/query/miqueryvaaca/resultPageNum
 * @param {*} pJSONFilePath Directorio del archivo JSON del que se lee la información
 * @param {*} pCSVFilePath Directorio del CSV de salida
 */
function watsonDocFromJSONArr(pJSONFilePath, pCSVFilePath = "out.csv", pCSVHeader) {
    const fs = require('fs');

    var csvData = [];                                    // CSV con formato Watson: "Titulo,CuerpoNota"
    var rawdata = fs.readFileSync(pJSONFilePath);        // Cargamos el JSON
    var notasArr = JSON.parse(rawdata);                  // Realizamos parse

    for (let i = 0; i < notasArr.length; i++) {
        let prettyJSON = JSON.parse(notasArr[i]);
        let nTitle = prettyJSON["CONTENIDO"]["NOTAS"]["NOTA"]["NOT_CONTENIDO"]["NOT_TITULO"]["_text"];      //Obtenemos el título de la nota
        let nBody = prettyJSON["CONTENIDO"]["NOTAS"]["NOTA"]["NOT_CONTENIDO"]["NOT_CUERPO"]["_cdata"];      //Obtenemos el cuerpo de la nota

        nBody = stripHTML(nBody);                           // Le quitamos el HTML al body

        let newElem = {title: nTitle, body: nBody};         // Creamos una nueva linea
        csvData.push(newElem);                              // La colocamos en el array
    }
    writeToCSV(csvData, pCSVFilePath, pCSVHeader);
    return csvData;
}

/**
 * Función auxiliar que elimina las etiquetas HTML de un texto.
 * @param {} pString Cadena cuyo HTML se desea eliminar
 */
function stripHTML(pString) {
    let stripped = pString.replace(/(<([^>]+)>)/ig, "");
    return stripped.replace(/&nbsp/ig, "");
}

/**
 * Escribe un conjunto de datos a un archivo CSV.
 * Requiere csv-writer. Para instalar, ejecutar: npm i -s csv-writer
 * @param {*} pData Datos a escribir
 * @param {*} pCSVFilePath Directorio de salida del CSV
 * @param {*} pHeader Formato del header del CSV. Es un array con elementos {key: value}
 */
function writeToCSV(pData, pCSVFilePath, pHeader) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: pCSVFilePath,
        header: pHeader
    });

    csvWriter.writeRecords(pData)       // Devuelve una promesa
        .then(() => {
            console.log('...Done');
        });
}

let jsonpath = './assets/raw_data/notas_coronavirus_4.json';
let csvpath = './assets/documents/notas_coronavirus_4.csv';
let header = [{ id: 'title', title: 'Titulo' },{ id: 'body', title: 'Cuerpo' }];
watsonDocFromJSONArr(jsonpath, csvpath, header);