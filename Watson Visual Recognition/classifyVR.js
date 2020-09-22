const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: 'MyApi',
  }),
  url: 'MyUrl',
});

const classifyParams = {
    imagesFile: fs.createReadStream('./insect.jpg'),
    owners: ['IBM'],
    threshold: 0.6,
  };
  
  visualRecognition.classify(classifyParams)
    .then(response => {
      const classifiedImages = response.result;
      console.log(classifiedImages);
      console.log(JSON.stringify(classifiedImages, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });