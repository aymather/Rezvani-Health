const moment = require('moment');

// Tells you how many data entries you should expect between dates
module.exports = function days_between(start, end){
    start = new moment(start, 'YYYY-MM-DD');
    end = new moment(end, 'YYYY-MM-DD');
    return end.diff(start, 'days') + 1;
}