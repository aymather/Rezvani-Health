const get_caloric_level = require('./GetCaloricLevel');
const get_metabolic_type = require('./GetMetabolicType');
const get_macros = require('./get_macros');
const get_ratio = require('./get_ratio');

function get_data(RMR, gender, HDL, LDL, TC, Trigs){

    var Caloric_Level, Metabolic_Type, Macros, Ratio;

    // Get caloric level based on RMR
    Caloric_Level = get_caloric_level(RMR);

    // Get Ratio: R. Cool/HDL Ratio
    Ratio = get_ratio(TC, HDL);

    // Get metabolic type
    Metabolic_Type = get_metabolic_type(gender, HDL, LDL, TC, Ratio, Trigs);

    // Get macro nutrients
    Macros = get_macros(Metabolic_Type);

    return {
        Caloric_Level,
        Metabolic_Type,
        Macros,
        Ratio
    }

}

module.exports = get_data;