// -------------------------------------------------------------------------
//                              AUTENTICACIÓN
// -------------------------------------------------------------------------

const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

// Credenciales
const service_apikey = "5HEELHhiC6B5XNkbl0mK-hjWJQeFYeolWQ0bRdIpjgde";
const service_url = "https://api.us-south.personality-insights.watson.cloud.ibm.com/instances/f707d431-8dd9-446f-ab8e-7f16c67749a2";

const personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    authenticator: new IamAuthenticator({
        apikey: service_apikey,
    }),
    serviceUrl: service_url,
});

const profileParams = {
    content: require('./profile.json'),
    contentType: 'application/json',
    consumptionPreferences: true,
    rawScores: true,
};

personalityInsights.profile(profileParams)
    .then(profile => {
        console.log(JSON.stringify(profile, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });