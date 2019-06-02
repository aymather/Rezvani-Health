function calculateMacros(TDEE, weight){

    var protein_grams, fat_grams, carbs_grams,
        protein_calories, fat_calories, carbs_calories;

    // For heavy lifting you can increase to 1lb per
    // lb of weight
    protein_grams = weight * 0.825; // grams
    protein_calories = protein_grams * 4;

    // 25% of your TDEE calories should be from fat
    // There are 9 calories per gram of fat in food
    fat_calories = TDEE * 0.25;
    fat_grams = fat_calories / 9;

    // The rest of our diet should be in carbs
    carbs_calories = TDEE - protein_calories - fat_calories;
    carbs_grams = carbs_calories / 4;

    return {
        protein_grams: protein_grams,
        protein_calories: protein_calories,
        fat_grams: fat_grams,
        fat_calories: fat_calories,
        carbs_grams: carbs_grams,
        carbs_calories: carbs_calories
    }
}

module.exports = calculateMacros;