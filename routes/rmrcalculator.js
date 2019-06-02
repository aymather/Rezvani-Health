// RMR Calculator page
const express = require('express');
const router = express.Router();
const IsWithinLevel = require('../backend_funcs/CalculateRMR').IsWithinLevel;
const Weir = require('../backend_funcs/CalculateRMR').Weir;
const HB = require('../backend_funcs/CalculateRMR').Harris_Benedict;
const KatchMc = require('../backend_funcs/CalculateRMR').Katch_Mc;
const User = require('../config/models');

// All calculators

// GET
router.get('/rmrcalculator', (req, res) => {
    res.render('calculators');
})

// Weir Method

// GET
router.get('/rmrcalculator/weir', (req, res) => {
    res.render('CalcRMR_Weir');
})

// POST
router.post('/rmrcalculator/weir', (req, res) => {
    let RMR = Weir(req.body.oxy_uptake, req.body.oxy_output);
    let Caloric_Level = IsWithinLevel(RMR);
    const person = new Client({
        firstname: 'Alec',
        data: [{
            meta: {
                RMR: RMR,
                Caloric_Level: Caloric_Level
            }
        }]
    })
    res.redirect(`/rmrcalculator/data?person=${JSON.stringify(person)}`);
})


// Harris Benedict

// GET
router.get('/rmrcalculator/harris_benedict', (req, res) => {
    res.render('CalcRMR_HarrisBenedict');
})

// POST
router.post('/rmrcalculator/harris_benedict', (req, res) => {
    let gender = req.body.gender,
        weight = req.body.weight,
        height = req.body.height,
        age = req.body.age;
    let RMR = HB(gender, weight, height, age);
    let Caloric_Level = IsWithinLevel(RMR);
    let user = new User({
        firstname: 'Alec',
        data: [{
            meta: {
                RMR: RMR,
                Caloric_Level: Caloric_Level
            }
        }]
    })
    res.redirect(`/rmrcalculator/data?person=${JSON.stringify(user)}`);
})


// Katch-McArdle (BMR)

// GET
router.get('/rmrcalculator/katch_mc', (req, res) => {
    res.render('CalcRMR_KatchMc');
})

// POST
router.post('/rmrcalculator/katch_mc', (req, res) => {
    let BMR, Caloric_Level, user,
        gender = req.body.gender,
        height = req.body.height,
        weight = req.body.weight;
    BMR = KatchMc(gender, weight, height);
    Caloric_Level = IsWithinLevel(BMR);
    user = new User({
        firstname: 'Alec',
        data: [{
            meta: {
                BMR: BMR,
                Caloric_Level: Caloric_Level
            }
        }]
    })
    res.redirect(`/rmrcalculator/data?person=${JSON.stringify(user)}`);
})


// Set manually

// Get
router.get('/rmrcalculator/manual', (req, res) => {
    res.render('ManualSetRMR');
})

// POST
router.post('/rmrcalculator/manual', (req, res) => {
    let user,
        RMR = req.body.rmr,
        Caloric_Level = req.body.caloric_level;
    user = new User({
        firstname: 'Alec',
        data: [{
            meta: {
                RMR: RMR,
                Caloric_Level: Caloric_Level
            }
        }]
    })
    res.redirect(`/rmrcalculator/data?person=${JSON.stringify(user)}`);
})

// Display the data to the user
router.get('/rmrcalculator/data', (req, res) => {
    let p;
    p = JSON.parse(req.query.person);
    res.render('data', {person: p});
})

module.exports = router;