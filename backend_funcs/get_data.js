const get_caloric_level = require('./GetCaloricLevel');
const get_metabolic_type = require('./GetMetabolicType');
const get_macros = require('./get_macros');

function get_data(RMR, gender, HDL, LDL, TC, Ratio, Trigs){

    var Caloric_Level, Metabolic_Type, Macros;

    // Get caloric level based on RMR
    Caloric_Level = get_caloric_level(RMR);

    // Get metabolic type
    Metabolic_Type = get_metabolic_type(gender, HDL, LDL, TC, Ratio, Trigs);

    // Get macro nutrients
    Macros = get_macros(Metabolic_Type);

    return {
        Caloric_Level: Caloric_Level,
        Metabolic_Type: Metabolic_Type,
        Macros: Macros
    }

}

module.exports = get_data;