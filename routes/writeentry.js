const express = require('express');
const router = express.Router();
const Client = require('../config/models');
const IsWithinLevel = require('../backend_funcs/CalculateRMR').IsWithinLevel;
const getMetabolicType = require('../backend_funcs/GetMetabolicType');

// Handles requests to Data entry page for
// an already created user.

// GET
router.get('/writeentry', (req, res) => {
    res.render('WriteEntry');
})

// POST
router.post('/writeentry', (req, res) => {
    var username = req.body.username,
        RMR = parseFloat(req.body.RMR.replace(',', '')),
        HDL = parseFloat(req.body.HDL.replace(',', '')),
        LDL = parseFloat(req.body.LDL.replace(',', '')),
        TC = parseFloat(req.body.TC.replace(',', '')),
        Ratio = parseFloat(req.body.ratio.replace(',', '')),
        Trigs = parseFloat(req.body.trigs.replace(',', '')),
        Weight = parseFloat(req.body.weight.replace(',','')),
        BFP = parseFloat(req.body.bfp.replace('%', ''));
        Client.findOne({username: username})
        .then(client => {
            if(client.length !== 0){

                // Get Caloric Level (1-11)
                Caloric_Level = IsWithinLevel(RMR);

                // Get Metabolic Type (Dual-Metabolism | Carbohydrate Efficient | Fat & Protein Efficient | None)
                Metabolic_Type = getMetabolicType(client.gender, HDL, LDL, TC, Ratio, Trigs);
                
                // Create entry and update info
                client.data.push({
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
                });
                client.Metabolic_Type = Metabolic_Type;
                client.save();
            }
        })
        .catch(err => {
            console.log(err);
        })
    res.render('WriteEntry');
})

module.exports = router;