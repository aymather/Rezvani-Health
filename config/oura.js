const baseUrl = 'https://api.ouraring.com';

module.exports = {
    authUrl: baseUrl + '/oauth',
    baseUrl: baseUrl + '/v1',
    accessTokenUri: baseUrl + '/oauth/token',
    authorizationUri: baseUrl + '/oauth/authorize',
    authorizationGrants: ['credentials'],
    scopes: ['personal', 'daily'],
    clientId: process.env.OURA_CLIENT_ID,
    clientSecret: process.env.OURA_CLIENT_SECRET,
    authCallbackUri: 'http://localhost:5000/authCallback',
    personalInfoApi: 'https://api.ouraring.com/v1/userinfo',
    sleepApi: 'https://api.ouraring.com/v1/sleep',
    activityApi: 'https://api.ouraring.com/v1/activity',
    readinessApi: 'https://api.ouraring.com/v1/readiness'
}