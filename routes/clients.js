const express = require('express');
const router = express.Router();
const oura = require('oura');
const ouraConfig = require('../config/oura');
const url = require('url');
const authMiddleware = require('../middleware/auth');
const User = require('../config/models');
const get_data = require('../backend_funcs/get_data');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const retreatIdMiddleware = require('../middleware/retreatId');
const grid = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const path = require('path');

// Build options object for authentication
let options = {
    clientId: ouraConfig.clientId,
    clientSecret: ouraConfig.clientSecret,
    redirectUri: ouraConfig.authCallbackUri
}

let authClient = oura.Auth(options);

// This is the redirect path from the oura auth API
let redirect_path = url.parse(options.redirectUri).pathname;

router.get(redirect_path, (req, res) => {
    // Trade the authorization code for an access_token
    authClient.code.getToken(req.originalUrl)
        .then(data => {
            // Extract access_token and refresh_token from response
            const { accessToken, refreshToken } = data;
            const { retreat_id, client_id, token } = JSON.parse(req.query.state);

            // Verify token
            const jwt_user = jwt.verify(token, config.get('jwtSecret'));
            
            // Place access/refresh token into client's profile
            User.findById(jwt_user.id)
                .then(user => {
                    user.retreats.id(retreat_id).clients.id(client_id).oura_api.oura_access_token = accessToken;
                    user.retreats.id(retreat_id).clients.id(client_id).oura_api.oura_refresh_token = refreshToken;

                    user.save()
                        .then(() => {
                            res.sendFile(path.resolve(__dirname, '../public', 'docs', 'Success.html'));
                        })
                        .catch(e => {
                            console.log(e);
                            res.sendFile(path.resolve(__dirname, '../public', 'docs', 'Error.html'));
                        });

                })
                .catch(() => {
                    res.status(400).json({ msg: "Bad request."});
                })

        })
        .catch(err => {
            console.log(err);
        })

})

router.get('/clients', authMiddleware, retreatIdMiddleware, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            var clients = user.retreats.id(req.retreat_id).clients.map(client => {
                return {
                    id: client._id,
                    email: client.email,
                    oura_api: client.oura_api,
                    Metabolic_Type: client.Metabolic_Type,
                    firstname: client.firstname,
                    lastname: client.lastname,
                    Water_Intake: client.Water_Intake,
                    Macros: client.Macros,
                    data: client.data,
                    medications: client.medications,
                    gender: client.gender,
                    birthday: client.birthday,
                    sleep: null,
                    activity: null,
                    readiness: null,
                    isLoading: true
                }
            })
            res.json({ clients: clients.reverse() });
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error"})
        })
})

router.post('/client-oura-data', authMiddleware, (req, res) => {
    const { access_token, day, id } = req.body;
    if(!access_token) return res.json({ id });
    if(access_token){
            // Decrease the day by 1 for readiness & sleep
            // because the developers at Oura are Marks and
            // send us the wrong days...
            var readiness_and_sleep_day = new moment(day).subtract(1, 'days').format('YYYY-MM-DD');
            var activity_day = new moment(day).format('YYYY-MM-DD');

            var client = new oura.Client(access_token);
            var sleep = client.sleep(readiness_and_sleep_day, readiness_and_sleep_day);
            var readiness = client.readiness(readiness_and_sleep_day, readiness_and_sleep_day);
            var activity = client.activity(activity_day, activity_day);

            Promise.all([ sleep, readiness, activity ]
                .map(p => p.catch(() => undefined)))
                .then(data => {
                    const sleep = data[0] ? data[0].sleep[0] : null;
                    const readiness = data[1] ? data[1].readiness[0] : null;
                    const activity = data[2] ? data[2].activity[0] : null;
                    res.json({ id, sleep, readiness, activity, isLoading: true });
                })
    }
})

router.post('/new-client', authMiddleware, retreatIdMiddleware, (req, res) => {
    var {   firstname, lastname,
            email, gender, birthday,
            medications, RMR,
            LDL, HDL, TC,
            Trigs, Blood_Glucose,
            Hemoglobin, Body_Fat_Percentage,
            Weight, BMI } = req.body;

    const { Caloric_Level,
            Macros,
            Metabolic_Type,
            Ratio } = get_data(RMR, gender, HDL, LDL, TC, Trigs);

    const Water_Intake = Weight;

    User.findById(req.user.id)
        .then(user => {
            user.retreats.id(req.retreat_id).clients.push({
                firstname,
                lastname,
                email,
                gender,
                birthday,
                medications,
                Metabolic_Type,
                Water_Intake,
                Macros,
                data: {
                    meta: {
                        RMR,
                        LDL,
                        HDL,
                        TC,
                        Ratio,
                        Trigs,
                        Blood_Glucose,
                        Hemoglobin,
                        Body_Fat_Percentage,
                        Weight,
                        Caloric_Level,
                        BMI
                    }
                }
            })
            
            // Save & send response
            user.save()
                .then(savedUser => {
                    
                    // Pass back the client we just created
                    var thisClient = savedUser.retreats.id(req.retreat_id).clients[savedUser.retreats.id(req.retreat_id).clients.length-1];
                    var returnClient = {
                        firstname: thisClient.firstname,
                        lastname: thisClient.lastname,
                        id: thisClient._id,
                        email: thisClient.email,
                        Metabolic_Type: thisClient.Metabolic_Type,
                        Water_Intake: thisClient.Water_Intake,
                        Macros: thisClient.Macros,
                        data: thisClient.data,
                        medications: thisClient.medications,
                        gender: thisClient.gender,
                        birthday: thisClient.birthday,
                        oura_api: {},
                        sleep: null,
                        activity: null,
                        readiness: null
                    }
                    res.json({ client: returnClient });
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal server error" });
                })
        })
})

router.post('/remove-client', authMiddleware, retreatIdMiddleware, (req, res) => {
    const { client_id } = req.body;

    User.findById(req.user.id)
        .then(user => {
            // Remove from any groups they were in
            for(group of user.retreats.id(req.retreat_id).groups){
                user.retreats.id(req.retreat_id).groups.id(group.id).members = group.members.filter(each_id => each_id !== client_id);
            }

            // Remove client model
            user.retreats.id(req.retreat_id).clients.id(client_id).remove();

            // Save
            user.save()
                .then(() => {
                    res.json({ client_id })
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal server error" });
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error" });
        })
})

router.get('/send-email', authMiddleware, retreatId, (req, res) => {
    const client_id = req.headers['client_id'];
    const email = req.headers['email'];

    const state = {
        token: req.headers['x-auth-token'],
        retreat_id: req.retreat_id,
        client_id
    }

    // Build options object for authentication
    let options = {
        clientId: ouraConfig.clientId,
        clientSecret: ouraConfig.clientSecret,
        redirectUri: ouraConfig.authCallbackUri,
        state: JSON.stringify(state)
    }
    
    let authClient = oura.Auth(options);

    const auth_uri = authClient.code.getUri();

    if(!client_id || !email){
        res.status(400).json({ msg: "Bad request." })
    }

    const html = `<h1 style='display: inline-block'>Click the link </h1><a href=${auth_uri}>here.</a>`;
    const from_email = new grid.Email('test@elementsretreat.com');
    const to_email = new grid.Email('aymather@gmail.com');
    const subject = 'Authenticate with Elements';
    const content = new grid.Content('text/html', html);
    const mail = new grid.Mail(from_email, subject, to_email, content);
    
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });
    sg.API(request, (err, response) => {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
})

router.post('/update-client-profile', authMiddleware, retreatId, (req, res) => {
    const { 
        medications, gender, Weight, 
        Water_Intake, BMI, Body_Fat_Percentage, 
        RMR, LDL, HDL, TC, Trigs, Blood_Glucose, 
        Hemoglobin, email, birthday, client_id
    } = req.body;
    User.findById(req.user.id)
        .then(user => {
            // Replace information with new data
            var client = user.retreats.id(req.retreat_id).clients.id(client_id);
            client.medications = medications;
            client.gender = gender;
            client.data[0].meta.Weight = Weight;
            client.Water_Intake = Water_Intake;
            client.data[0].meta.BMI = BMI;
            client.data[0].meta.Body_Fat_Percentage = Body_Fat_Percentage;
            client.data[0].meta.RMR = RMR;
            client.data[0].meta.LDL = LDL;
            client.data[0].meta.HDL = HDL;
            client.data[0].meta.TC = TC;
            client.data[0].meta.Trigs = Trigs;
            client.data[0].meta.Blood_Glucose = Blood_Glucose;
            client.data[0].meta.Hemoglobin = Hemoglobin;
            client.email = email;
            client.birthday = birthday;

            // Get calculated data
            const {
                Caloric_Level,
                Metabolic_Type,
                Macros,
                Ratio
            } = get_data(RMR, gender, HDL, LDL, TC, Trigs);

            // Place updated info into client document
            client.Metabolic_Type = Metabolic_Type;
            client.Macros = Macros;
            client.data[0].meta.Ratio = Ratio
            client.data[0].meta.Caloric_Level = Caloric_Level;

            user.save()
                .then(savedUser => {
                    // Get the client we just saved again
                    var thisClient = savedUser.retreats.id(req.retreat_id).clients.id(client_id);
                    var returnClient = {
                        firstname: thisClient.firstname,
                        lastname: thisClient.lastname,
                        id: thisClient._id,
                        email: thisClient.email,
                        Metabolic_Type: thisClient.Metabolic_Type,
                        Water_Intake: thisClient.Water_Intake,
                        Macros: thisClient.Macros,
                        data: thisClient.data,
                        medications: thisClient.medications,
                        gender: thisClient.gender,
                        birthday: client.birthday,
                        oura_api: thisClient.oura_api,
                        sleep: null,
                        activity: null,
                        readiness: null
                    }
                    res.json({ client: returnClient });
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal Server Error"})
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal Server Error"})
        })
})

module.exports = router;