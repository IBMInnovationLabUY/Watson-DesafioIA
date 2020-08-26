const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: '3ckkLcYlLR-Hwf_vbFnbI1Url1FFABaHupsYeAbYzc-p',
  }),
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/10494091-7027-4aed-8cd6-d9d70c422f20',
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
