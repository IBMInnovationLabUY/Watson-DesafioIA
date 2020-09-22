const NaturalLanguageClassifierV1 = require('ibm-watson/natural-language-classifier/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageClassifier = new NaturalLanguageClassifierV1({
  authenticator: new IamAuthenticator({
    apikey: 'MyApi',
  }),
  serviceUrl: 'MyURL',
});

const classifyParams = {
  text: 'El servicio que proveen es terrible!',
  classifierId: 'MyID',
};



function classify() {
  naturalLanguageClassifier.classify(classifyParams)
    .then(response => {
      const classification = response.result;
      console.log(JSON.stringify(classification, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
}

function listClassifiers() {
  naturalLanguageClassifier.listClassifiers()
    .then(response => {
      const classifierList = response.result;
      console.log(JSON.stringify(classifierList, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
}


const getClassifierParams = {
  classifierId: 'fa4dd2x786-nlc-213',
};

function getClassifier() {
  naturalLanguageClassifier.getClassifier(getClassifierParams)
    .then(response => {
      const classifier = response.result;
      console.log(JSON.stringify(classifier, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
}


// classify()
// listClassifiers()
// getClassifier()
