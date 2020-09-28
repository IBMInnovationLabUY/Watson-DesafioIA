// -------------------------------------------------------------------------
//                              AUTENTICACIÓN
// -------------------------------------------------------------------------

const fs = require('fs');

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu_apikey = "FsiOxLTWZD3z51cuPZef_YWUllHcETeiFBCmG-bdL_Hn";
const nlu_url = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/891dea0c-c875-4dd3-908d-e6069d3b2531";

const wks_model_id = "92c7efbf-2e46-4b64-8b9a-47633958b7cb"     // ID del modelo de Machine Learning de Knowledge Studio

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: nlu_apikey,
    }),
    serviceUrl: nlu_url,
});

// -------------------------------------------------------------------------
//                        ANÁLISIS DE TEXTO
// -------------------------------------------------------------------------

const analyzeParams_File = require("./4 - testInput.json");         // Parámetros a enviarle al servicio (JSON)

/**
 * Detección de categorías
 * @param {*} url 
 */
async function analyze_NLU(analyzeParams) {
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
}

// -------------------------------------------------------------------------
//                                    DEMO
// -------------------------------------------------------------------------
analyze_NLU(analyzeParams_File);                           // Llamada a NLU