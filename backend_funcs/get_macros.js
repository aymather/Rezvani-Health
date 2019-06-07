// Determine multipliers for macros from metabolic type
function get_macros(metabolic_type){

    var macros;

    if (metabolic_type === 'Dual-Metabolism' || 
    metabolic_type === 'Out of balance | Dual-Metabolism'){
        macros = {
            carb: .33,
            protein: .33,
            fat: .33
        }
    } else if (metabolic_type === 'Carbohydrate-Efficient'){
        macros = {
            carb: .68,
            protein: .2,
            fat: .12
        }
    } else if (metabolic_type === 'Fat & Protein Efficient'){
        macros = {
            carb: .25,
            protein: .5,
            fat: .25
        }
    } else {
        console.log('Error in getting macros from metabolic type. Check file /backend_funcs/GetMetabolicType.js');
    }

    return macros;

}

module.exports = get_macros;