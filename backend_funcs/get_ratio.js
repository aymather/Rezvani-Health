// Calculates ratio
// R. Cool/HDL Ratio
module.exports = function get_ratio(TC, HDL){
    return Math.round(((TC/HDL)*100))/100
}