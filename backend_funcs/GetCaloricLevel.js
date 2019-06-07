// GetCaloricLevel = function that tells you which calorie
// level you are within

function GetCaloricLevel(val){
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

module.exports = GetCaloricLevel;