const baseUrl = 'https://api.ouraring.com';

module.exports = {
    authUrl: baseUrl + '/oauth',
    baseUrl: baseUrl + '/v1',
    accessTokenUri: baseUrl + '/oauth/token',
    authorizationUri: baseUrl + '/oauth/authorize',
    authorizationGrants: ['credentials'],
    scopes: ['personal', 'daily'],
    clientId: '6E3WNOTABO6RZSLV',
    clientSecret: 'M35UZ2IBWP3GADWDB55NHMJAT2T7VWB5',
    authCallbackUri: 'http://localhost:5000/authCallback',
    personalInfoApi: 'https://api.ouraring.com/v1/userinfo',
    sleepApi: 'https://api.ouraring.com/v1/sleep',
    activityApi: 'https://api.ouraring.com/v1/activity',
    readinessApi: 'https://api.ouraring.com/v1/readiness'
}