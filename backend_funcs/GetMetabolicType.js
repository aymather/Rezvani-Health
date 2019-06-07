function isWithinRange(val, range){
    let min = Math.min(...range),
        max = Math.max(...range);
    
    if(val >= min && val <= max){
        return 1;
    } else {
        return 0;
    }
}

function getMetabolicType(gender, HDL, LDL, TC, Ratio, Trigs){

    // Init settings for metabolic types
    let settings, sum = 0;
    if(gender === 'male' || gender === 'other'){
        settings = require('../config/keys').MaleMetablicSettings;
    } else if (gender === 'female') {
        settings = require('../config/keys').FemaleMetablicSettings;
    } else {
        console.log('Invalid gender type.');
    }

    console.log(settings);

    // Dual-Metabolism (step 1)
    sum += isWithinRange(HDL, settings.DM.HDL);
    sum += isWithinRange(Ratio, settings.DM.Ratio);
    sum += isWithinRange(TC, settings.DM.TC);
    sum += isWithinRange(Trigs, settings.DM.Trigs);
    if(sum >= 3){
        let metabolic_type = 'Dual-Metabolism';
    }

    // Carbohydrate-Efficient (step 2)
    sum = 0;
    sum += isWithinRange(HDL, settings.CE.HDL);
    sum += isWithinRange(Ratio, settings.CE.Ratio);
    sum += isWithinRange(Trigs, settings.CE.Trigs);
    if(sum >= 2){
        let metabolic_type = 'Carbohydrate-Efficient';
    }

    // Fat & Protein Efficient (step 3)
    sum = 0;
    sum += isWithinRange(HDL, settings.FPE.HDL);
    sum += isWithinRange(Ratio, settings.FPE.Ratio);
    sum += isWithinRange(Trigs, settings.FPE.Trigs);
    if(sum >= 2){
        let metabolic_type = 'Fat & Protein Efficient';
    }

    if(HDL < 45 && Trigs > 140 && LDL > 130){
        let metabolic_type = 'Out of balance | Dual-Metabolism';
    } else {
        let metabolic_type = 'Does not meet any criteria.';
    }
    if(metabolic_type){

        return metabolic_type;

    } else {
        console.log('Error getting metabolic type.')
        return {}
    }

}

module.exports = getMetabolicType;