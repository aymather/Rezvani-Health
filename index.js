const hb = require('./CalculateRMR').Harris_Benedict;
const cunn = require('./CalculateRMR').Cunningham;
const range = require('./constants').RMR_Levels;

var val = hb('male', 170, 182.88, 22);
val = cunn(170, .12);


let RMR = 3002;

function between(RMR, min, max){
    return RMR > min && RMR < max;
}


for(let i=0; i<range.length; i++){
    console.log(RMR);
    console.log(range[i]);
    console.log(between(RMR,range[i][0],range[i][1]));
    if (between(RMR,range[i][0],range[i][1])){
        let level = i + 1;
        return level;
    }
}

console.log(level);

//console.log(range);