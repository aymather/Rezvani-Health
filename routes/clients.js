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
            const { client_id, token } = JSON.parse(req.query.state);

            // Verify token
            const jwt_user = jwt.verify(token, config.get('jwtSecret'));
            
            // Place access/refresh token into client's profile
            User.findById(jwt_user.id)
                .then(user => {
                    user.clients.id(client_id).oura_api.oura_access_token = accessToken;
                    user.clients.id(client_id).oura_api.oura_refresh_token = refreshToken;

                    user.save().catch(e => {console.log(e)});

                    res.redirect('http://localhost:3000');
                    
                })
                .catch(() => {
                    res.status(400).json({ msg: "Bad request."});
                })

        })
        .catch(err => {
            console.log(err);
        })

})

router.get('/clients', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            var clients = user.clients.map(client => {
                return {
                    id: client._id,
                    oura_api: client.oura_api,
                    Metabolic_Type: client.Metabolic_Type,
                    firstname: client.firstname,
                    lastname: client.lastname,
                    Water_Intake: client.Water_Intake,
                    Macros: client.Macros,
                    data: client.data,
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

router.post('/new-client', authMiddleware, (req, res) => {
    
    var {   firstname, lastname,
            email, gender, birthday,
            medications, RMR,
            LDL, HDL, TC,
            Trigs, Blood_Glucose,
            Hemoglobin, Body_Fat_Percentage,
            Weight } = req.body;

    var errors = [];

    if(!firstname || !lastname || !email ||
       !gender || !birthday || !medications ||
       !RMR || !LDL || !HDL || !TC ||
       !Trigs || !Blood_Glucose || !Hemoglobin ||
       !Body_Fat_Percentage || !Weight){

        errors.push({ msg: "Missing inputs"});
    }

    RMR = parseFloat(RMR.replace(/,/g, ''));
    LDL = parseFloat(LDL.replace(/,/g, ''));
    HDL = parseFloat(HDL.replace(/,/g, ''));
    TC = parseFloat(TC.replace(/,/g, ''));
    Trigs = parseFloat(Trigs.replace(/,/g, ''));
    Blood_Glucose = parseFloat(Blood_Glucose.replace(/,/g, ''));
    Hemoglobin = parseFloat(Hemoglobin.replace(/,/g, ''));
    Body_Fat_Percentage = parseFloat(Body_Fat_Percentage.replace(/,/g, ''));
    Weight = parseFloat(Weight.replace(/,/g, ''));

    if(!RMR || !LDL || !HDL || !TC ||
       !Trigs || !Blood_Glucose ||
       !Hemoglobin || !Body_Fat_Percentage ||
       !Weight){

        errors.push({ msg: "Invalid input"});
    }

    if(errors.length > 0){
        res.status(400).json({ msg: "Bad request" });
    } else {

        const { Caloric_Level,
                Macros,
                Metabolic_Type,
                Ratio } = get_data(RMR, gender, HDL, LDL, TC, Trigs);

        const Water_Intake = Weight;
        
        User.findById(req.user.id)
            .then(user => {
                user.clients.push({
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
                            Caloric_Level
                        }
                    }
                })
                
                // Save & send response
                user.save()
                    .then(savedUser => {
                        
                        // Pass back the client we just created
                        var thisClient = savedUser.clients[savedUser.clients.length-1];
                        var returnClient = {
                            firstname: thisClient.firstname,
                            lastname: thisClient.lastname,
                            id: thisClient._id,
                            Metabolic_Type: thisClient.Metabolic_Type,
                            Water_Intake: thisClient.Water_Intake,
                            Macros: thisClient.Macros,
                            data: thisClient.data,
                            oura_api: {},
                            sleep: null,
                            activity: null,
                            readiness: null
                        }
                        res.json({ client: returnClient });
                    })
                    .catch((e) => {
                        console.log('error here');
                        console.log(e);
                        res.status(500).json({ msg: "Internal server error" });
                    })
            })
        
    }
})

router.post('/remove-client', authMiddleware, (req, res) => {
    const { client_id } = req.body;

    User.findById(req.user.id)
        .then(user => {
            // Remove from any groups they were in
            for(group of user.groups){
                user.groups.id(group.id).members = group.members.filter(each_id => each_id !== client_id);
            }

            // Remove client model
            user.clients.id(client_id).remove();

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

module.exports = router;