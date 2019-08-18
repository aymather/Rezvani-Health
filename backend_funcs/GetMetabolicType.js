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
    if(gender === 'male'){
        settings = require('../config/keys').MaleMetablicSettings;
    } else if(gender === 'female'){
        settings = require('../config/keys').FemaleMetabolicSettings;
    } else {
        settings = require('../config/keys').MaleMetablicSettings;
    }
    
    // Dual-Metabolism (step 1)
    sum += isWithinRange(HDL, settings.DM.HDL);
    sum += isWithinRange(LDL, settings.DM.LDL);
    sum += isWithinRange(Ratio, settings.DM.Ratio);
    sum += isWithinRange(TC, settings.DM.TC);
    sum += isWithinRange(Trigs, settings.DM.Trigs);
    if(sum >= 3){
        return 'Dual-Metabolism';
    }
    
    // Carbohydrate-Efficient (step 2)
    sum = 0;
    sum += isWithinRange(HDL, settings.CE.HDL);
    sum += isWithinRange(Ratio, settings.CE.Ratio);
    sum += isWithinRange(Trigs, settings.CE.Trigs);
    if(sum >= 2){
        return 'Carbohydrate-Efficient';
    }
    
    // Fat & Protein Efficient (step 3)
    sum = 0;
    sum += isWithinRange(HDL, settings.FPE.HDL);
    sum += isWithinRange(Ratio, settings.FPE.Ratio);
    sum += isWithinRange(Trigs, settings.FPE.Trigs);
    if(sum >= 2){
        return 'Fat & Protein Efficient';
    }
    
    if(HDL < 45 && Trigs > 140 && LDL > 130){
        return 'Out of balance | Dual-Metabolism';
    } else {
        return 'Does not meet any criteria.';
    }

}

module.exports = getMetabolicType;