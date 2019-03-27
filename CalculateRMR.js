// All equations are found from the following blog page
// Written by: Mark Kelly PhD
// https://www.acefitness.org/certifiednewsarticle/2882/resting-metabolic-rate-best-ways-to-measure-it-and/


// Weir: Most accurate, requires oxygen analysis machine

// VO2 = Volume of oxygen uptake (mL/min)
// VCO2 = Volume of carbon dioxide output (mL/min)
// REE = Resting Energy Expenditure
// RQ = Respitory Quotient

// Both outputs need to be multiplied by
// the number of minutes in a day to get
// RMR per day
function Weir(VO2, VCO2){

    // Respitory Quotient (RQ)
    let RQ = VO2 / VCO2;

    // Resting Energy Expenditure (REE)
    let REE = ((3.9 * VO2) + (1.1 * VCO2)) * 1.44;

    return {REE, RQ};

};


// Harris-Benedict Revised (less accurate)

// Weight (kg)
// Height (cm)
// Age (years)

function Harris_Benedict(gender, weight, height, age){

    let RMR;

    // Differs based on gender
    if (gender == 'male'){
        RMR = (88.4 + 13.4 * weight) + (4.8 * height) - (5.68 * age);
    } else if(gender == 'female'){
        RMR = (447.6 + 9.25 * weight) + (3.10 * height) - (4.33 * age);
    }

    return RMR;

}


// Mifflin-St Jeor (more accurate than Harris_Benedict, less accurate than Weir)

// Weight (kg)
// Height (cm)
// Age (years)

function Miff_Jeor(gender, weight, height, age){

    let RMR;

    if (gender === 'male') {
        RMR = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
    } else if (gender === 'female') {
        RMR = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
    }
    
    return RMR;
}


// Katch-McArdle (BMR) | For clients with lean body mass

// Weight (kg)
// Body Fat Percentage (BFP)
// LBM = Weight - (Weight * BFP)

function Katch_Mc(weight, BFP){

    // Calculate Lean Body Mass
    let LBM = weight - (weight * BFP);

    // Calculate BMR
    let BMR = 370 + (21.6 * LBM);

    return BMR;

}


// Cunningham (RMR) | Provides a slightly higher estimate than Katch_Mc

function Cunningham(weight, BFP){

    // Calculate Lean Body Mass
    let LBM = weight - (weight * BFP);

    // Calculate BMR
    let BMR = 370 + (21.6 * LBM);

    return BMR;
}


module.exports = { Weir, Harris_Benedict, Miff_Jeor,
                   Katch_Mc, Cunningham }