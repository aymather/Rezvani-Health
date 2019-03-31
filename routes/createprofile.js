const express = require('express');
const router = express.Router();
const Client = require('../config/models');
const IsWithinLevel = require('../backend_funcs/CalculateRMR').IsWithinLevel;
const getMetabolicType = require('../backend_funcs/GetMetabolicType');

// Handles requests for Creating a new User
router.get('/createprofile', (req, res) => {
    res.render('CreateProfile');
});

router.post('/createprofile', (req, res) => {
    // Extract from form
    var Metabolic_Type, 
        Caloric_Level,
        firstname = req.body.firstname,
        lastname = req.body.lastname,
        username = req.body.username,
        gender = req.body.gender,
        RMR = parseFloat(req.body.RMR.replace(',', '')),
        HDL = parseFloat(req.body.HDL.replace(',', '')),
        LDL = parseFloat(req.body.LDL.replace(',', '')),
        TC = parseFloat(req.body.TC.replace(',', '')),
        Ratio = parseFloat(req.body.ratio.replace(',', '')),
        Trigs = parseFloat(req.body.trigs.replace(',', '')),
        Weight = parseFloat(req.body.weight.replace(',','')),
        BFP = parseFloat(req.body.bfp.replace('%', ''));

    // Check inputs
    if(firstname && lastname && gender && 
        !isNaN(RMR) && !isNaN(HDL) && !isNaN(LDL) && 
        !isNaN(TC) && !isNaN(Ratio) && !isNaN(Trigs)) {

            // Get Caloric Level (1-11)
            Caloric_Level = IsWithinLevel(RMR);

            // Get Metabolic Type (Dual-Metabolism | Carbohydrate Efficient | Fat & Protein Efficient | None)
            Metabolic_Type = getMetabolicType(gender, HDL, LDL, TC, Ratio, Trigs);

            // Put data into database
            client = new Client({
                firstname: firstname,
                lastname: lastname,
                username: username,
                Metabolic_Type: Metabolic_Type,
                data: [{
                    meta: {
                        RMR: RMR,
                        HDL: HDL,
                        LDL: LDL,
                        TC: TC,
                        Ratio: Ratio,
                        Trigs: Trigs,
                        BFP: BFP,
                        Weight: Weight,
                        Caloric_Level: Caloric_Level
                    }
                }]
            })

            console.log(client);
            console.log(client.data[0].meta);
            client.save();

        // 1. put everything into database
        // 4. perscribe meal plan
    } else {
        // 5. redirect back to form page with flash message
    }
    res.render('CreateProfile');
});

module.exports = router;