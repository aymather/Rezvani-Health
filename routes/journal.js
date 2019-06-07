const express = require('express');
const router = express.Router();
const User = require('../config/models');
const { ensureAuthenticated } = require('../config/auth');
const GetCaloricLevel = require('../backend_funcs/GetCaloricLevel');
const getMetabolicType = require('../backend_funcs/GetMetabolicType');
const get_macros = require('../backend_funcs/get_macros');

router.get('/journal', ensureAuthenticated, (req, res) => {
    res.render('Journal', {
        user: req.user
    })
})

router.post('/journal', ensureAuthenticated, (req, res) => {

    // Extract from request
    var { RMR, HDL, LDL, TC, 
          ratio, trigs, hemoglobin, 
          blood_glucose, bfp, weight } = req.body;

    // Parse just in case they used some funky inputs
    RMR = parseFloat(RMR.replace(',', '')),
    HDL = parseFloat(HDL.replace(',', '')),
    LDL = parseFloat(LDL.replace(',', '')),
    TC = parseFloat(TC.replace(',', '')),
    Ratio = parseFloat(ratio.replace(',', '')),
    Trigs = parseFloat(trigs.replace(',', '')),
    Hemoglobin = parseFloat(hemoglobin.replace(',','')),
    Blood_Glucose = parseFloat(blood_glucose.replace(',','')),
    Weight = parseFloat(weight.replace(',','')),
    BFP = parseFloat(bfp.replace('%', ''));

    // Get Caloric Level (1-11)
    let Caloric_Level = GetCaloricLevel(RMR);
    console.log(Caloric_Level);
    console.log(getMetabolicType);
    // Get Metabolic Type (Dual-Metabolism | Carbohydrate Efficient | Fat & Protein Efficient | None)
    let Metabolic_Type = getMetabolicType(req.user.gender, HDL, LDL, TC, Ratio, Trigs);
    console.log(Metabolic_Type);
    // Get Macros based on metabolic type
    let Macros = get_macros(Metabolic_Type);
    console.log(Macros);
    // Find user in database
    User.findOne({ username: req.user.username })
        .then(userdata => {

            // Create entry and update info
            userdata.data.push({
                meta: {
                    RMR: RMR,
                    HDL: HDL,
                    LDL: LDL,
                    TC: TC,
                    Ratio: Ratio,
                    Trigs: Trigs,
                    BFP: BFP,
                    Hemoglobin: Hemoglobin,
                    Blood_Glucose: Blood_Glucose,
                    Weight: Weight,
                    Caloric_Level: Caloric_Level
                }
            });
            userdata.Metabolic_Type = Metabolic_Type;
            userdata.Macros = Macros;
            userdata.save();
            res.render('Journal', {
                user: userdata
            })
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;