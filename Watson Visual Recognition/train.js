const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const {IamAuthenticator} = require ('ibm-watson/auth');
var fs = require('fs');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey:'MyApi',
  }),
  url: 'MyUrl',
});

const createClassifierParams = {
  name: 'Plagas',
  negativeExamples:fs.createReadStream('./imagenes/Negative.zip'),
  positiveExamples: {
    Chinche_verde: fs.createReadStream('./imagenes/Chinche verde.zip'),  
    Chinche_marron: fs.createReadStream('./imagenes/Chinche marrón.zip'),
    Chinche_pequeña: fs.createReadStream('./imagenes/Chinche pequeña.zip'),
    Oruga: fs.createReadStream('./imagenes/Oruga.zip')
  } 
};

visualRecognition.createClassifier(createClassifierParams).then(response=> {
  const classifier = response.result;
  console.log(JSON.stringify(classifier, null, 2));
}).catch(err => {
  console.log('error', err);
});








  
