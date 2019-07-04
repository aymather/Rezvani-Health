const oura = require('oura');
const request = require('request');
const ouraConfig = require('../config/oura');
const dateObjAlreadyExists = require('./dateObjAlreadyExists');

// Takes in information about your request to oura api
// returns a sorted array (by date) of that category
function getOuraData(user, member, data_type, start, end){

    return new Promise((resolve, reject) => {
        // Extract access_token/refresh_token
        var { oura_access_token, oura_refresh_token } = member.oura_api;
        
        // Create a client to interact with oura api
        var client = new oura.Client(oura_access_token);
        
        // Make request to oura api
        client[data_type](start, end)
            .then(data => {
                
                // Check if any of the queried data is already in the database
                var filteredData = data[data_type].filter(entry => dateObjAlreadyExists(entry.summary_date, member[data_type]));
                
                // Push the remaining data into the database
                member[data_type].push(...filteredData);

                // Save changes
                user.save((err, newUser) => {
                    resolve(data[data_type]);
                });
                
            })
            .catch(error => {
                
                console.log('We used a refresh token in this request');
                // We most likely need to refresh an access_token, 
                // so lets try that, and if that doesn't work, then we can reject
                // and display an error in retrieving the data.
                var options = { 
                    method: 'POST',
                    url: ouraConfig.accessTokenUri,
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    form: { 
                        grant_type: 'refresh_token',
                        client_id: ouraConfig.clientId,
                        client_secret: ouraConfig.clientSecret,
                        refresh_token: oura_refresh_token
                    } 
                };

                // Request new access/refresh tokens
                request(options, function (error, response, body) {

                    // Handle error
                    if (error) { console.log(error); reject(error); };

                    // Put new access/refresh tokens into database
                    const { access_token, refresh_token } = JSON.parse(body);
                    member.oura_api.oura_access_token = access_token;
                    member.oura_api.oura_refresh_token = refresh_token;

                    // Save and try getting data with new access_token
                    user.save((err, newUser) => {
                        if(err){ console.log(err); reject(err); }

                        // If everything saves and we have a new access_token
                        // and refresh_token, then let's try getting that data
                        // again to see if that was the problem

                        // Create a NEW client to interact with oura api
                        client = new oura.Client(member.oura_api.oura_access_token);

                        client[data_type](start, end)
                            .then(data => {

                                // Check if any of the queried data is already in the database
                                var filteredData = data[data_type].filter(entry => dateObjAlreadyExists(entry.summary_date, member[data_type]));
                
                                // Push the remaining data into the database
                                member[data_type].push(...filteredData);
                
                                // Save changes
                                newUser.save((err, newUser) => {
                                    if(err){ console.log(err); reject(err); }
                                    resolve(data[data_type]);
                                });
                                
                            })
                            .catch(error => {
                                console.log('Using the new access_token didnt fix the problem');
                                reject(error);
                            })

                    })
                });
            })
    })
}

module.exports = getOuraData;