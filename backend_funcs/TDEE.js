// Make sure when using this function that weight is in
// kg and height is in cm

function get_TDEE(weight, height, age, activity_level){

    var REE;

    // Resting energy expenditure
    REE = (10 * weight) + (6.25 * height) - (5 * age) + 5;

    // Activity level multiplier
    TDEE = REE * activity_level;

    return TDEE;
}

module.exports = get_TDEE;