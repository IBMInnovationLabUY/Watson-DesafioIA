//Tutorial encontrado en:
//https://cloud.ibm.com/apidocs/natural-language-understanding/natural-language-understanding?code=node#analyze-text

const NLU_V1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const noa_MLU_apk = "FsiOxLTWZD3z51cuPZef_YWUllHcETeiFBCmG-bdL_Hn";
const noa_MLU_url = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/891dea0c-c875-4dd3-908d-e6069d3b2531";
const noa_model_ID = "728a75a6-2df6-4334-bdcc-e10772c00c43";

const NLU = new NLU_V1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: noa_MLU_apk,
  }),
  url: noa_MLU_url,
});

var test_Text = "El expresidente del Real Madrid Lorenzo Sanz se encuentra en estado grave tras haber dado positivo de Covid-19, según informó el Ideal de Granada. El exdirigente de 76 años tenía fiebre y fue ingresado de urgencia a la unidad de tratamiento intensivo en las últimas horas.Según informa el diario deportivo Marca, Sanz llegó al hospital con problemas respiratorios. Pese a ello, no ha sido intubado en la UCI aunque se encuentra en permanente vigilancia, ya que por edad se encuadra dentro del grupo de riesgo del coronavirus.Por el momento, el Real Madrid ni nadie del entorno de Sanz confirmaron el grave estado de salud por el que atraviesa el exdirigente a causa del coronavirus. En España, los afectados por el virus ya superan las 13.000 personas, de entre los cuales hay más de 500 fallecidos.";

test_Text = "Este texto es una prueba para NOA. Quiero saber si puede detectar cuando digo cosas como: ?¡Coronavirus! En Uruguay vive un hombrecillo llamado Alonso González, que está enfermo de COVID-19, dio positivo en los exámenes. Además, este hombre presenta síntomas como tos seca y ganas de saltar por la ventana. Fue al Hospital Italiano a atenderse pero el Doctor Mario Pérez le dijo que se fuera a su casa. Alonso, que es contador, vive en Montevideo y tiene dos niños. Trabaja en IBM."

// Llamadas a la API con el formato de:
// https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#entities
analyzeParams = {
  'text': test_Text,
  'features': {
    'entities': {
      //'model' : noa_model_ID,
      'mentions' : true,
      'limit': 100
    },
    'keywords' :{
      'limit' : 100
    },
    'relations' : {
      //'model' : noa_model_ID
    }
  }
};

NLU.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });