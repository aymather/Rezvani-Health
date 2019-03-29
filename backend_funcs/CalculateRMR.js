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
    //let RQ = VCO2 / VO2;

    // Resting Energy Expenditure (REE)
    let REE = ((3.9 * VO2) + (1.1 * VCO2)) * 1.44;

    return REE;

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
// Height (cm)
// LBM = Weight - (Weight * BFP)

// LBM (men) = 0.407 * weight + 0.267 * height * 100 - 19.2
// LBM (women) = 0.252 * weight + 0.473 * height * 100 - 48.3

function Katch_Mc(gender, weight, height){

    let LBM;

    // Calculate Lean Body Mass
    if (gender == 'male') {
        LBM = (0.407 * weight) + (0.267 * height) - 19.2;
    } else if (gender == 'female') {
        LBM = (0.252 * weight) + (0.473 * height) - 48.3;
    }

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


// IsWithinLevel = function that tells you which calorie
// level you are within

function IsWithinLevel(val){
    // These are the levels organized by calorie range
    const levels = [
        [0, 1200],
        [1201, 1365],
        [1366, 1480],
        [1481, 1685],
        [1686, 1805],
        [1806, 2180],
        [2181, 2330],
        [2331, 2450],
        [2451, 2765],
        [2766, 3065],
        [3065, 9999]
    ];

    for(let i=0; i<levels.length;i++){
        if(val >= levels[i][0] & val <= levels[i][1]){
            return i+1;
        }
    }
}

module.exports = { Weir, Harris_Benedict, Miff_Jeor,
                   Katch_Mc, Cunningham, IsWithinLevel }