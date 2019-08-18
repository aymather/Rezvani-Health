const moment = require('moment');
const days_between = require('./days_between');

module.exports = function createPlaceholderData(data, start, end){
    var expected_number_of_entries = days_between(start, end);

    if(data.length == expected_number_of_entries) return data;

    var i = 0;
    var sum = 0;
    var returnData = [];
    while(i < expected_number_of_entries){

        // Search through the data to see if the entry exists
        for(entry of data){
            if(moment(entry.summary_date, 'YYYY-MM-DD').isSame(start)){
                returnData.push(entry);
                sum = 1;
                break;
            }
        }

        // If none of them matched, create a placeholder
        if(sum == 0){ 
            returnData.push({ summary_date: new moment(start).format('YYYY-MM-DD') });
        }

        start = start.add(1, 'days'); i++; d = null; sum = 0;
    }

    return returnData.length == expected_number_of_entries ? returnData : null;

}