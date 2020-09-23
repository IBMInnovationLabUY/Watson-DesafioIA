// -------------------------------------------------------------------------
//                              AUTENTICACIÓN
// -------------------------------------------------------------------------

const fs = require('fs');

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const service_apikey = "FsiOxLTWZD3z51cuPZef_YWUllHcETeiFBCmG-bdL_Hn";
const service_url = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/891dea0c-c875-4dd3-908d-e6069d3b2531";

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: service_apikey,
    }),
    serviceUrl: service_url,
});

// -------------------------------------------------------------------------
//                        FUNCIONES DE ANÁLISIS DE TEXTO
// -------------------------------------------------------------------------

/**
 * Detección de categorías
 * @param {*} url 
 */
async function analyzeCategories(url) {
    const analyzeParams = {
        'url': url,
        'features': {
            'categories': {
                'limit': 3
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
}

/**
 * Detección de entidades
 * @param {*} url 
 */
async function analyzeEntities(url) {
    const analyzeParams = {
        'html': my_html,
        'features': {
            'entities': {
                'sentiment': true,
                'limit': 1,
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
}

/**
 * Detección de Keywords
 * @param {*} url 
 */
async function analyzeKeywords(url){
    const analyzeParams = {
        'url': url,
        'features': {
          'keywords': {
            'sentiment': true,
            'emotion': true,
            'limit': 3
          }
        }
      };
      
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
var my_url, keywords;

// my_url = "www.ibm.com";
my_url = "https://www.infocasas.com.uy/";

var my_html = fs.readFileSync('./emotions.html', "utf8");

// analyzeCategories(my_url);                               // Detección de categorías
// analyzeEntities();                                       // Detección de entidades
// analyzeKeywords(my_url);                                 // Detección de keywords