const getOuraData = require('../backend_funcs/getOuraData');
const sortEntries = require('../backend_funcs/sortEntries');
const moment = require('moment');

module.exports = {

    get_member_data: function(data_type, start, end){
    
        return new Promise((resolve, reject) => {
            // Convert inputs to moments
            var moment_start = new moment(start, 'YYYY-MM-DD'),
                moment_end = new moment(end, 'YYYY-MM-DD'),
                expected_number_of_entries = moment_end.diff(moment_start, 'days') + 1;
                
            try {
    
                // Array of entries we already have in our database
                saved_entries = [];

                for(entry of this[data_type]){
                    // Convert the comparison date to a new moment
                    let comp_date = new moment(entry.summary_date, 'YYYY-MM-DD');
    
                    // Throw an error if we already have that date in the database
                    if(comp_date.isSame(moment_start) ||
                    comp_date.isBetween(moment_start, moment_end) ||
                    comp_date.isSame(moment_end)){
                    
                        saved_entries.push(entry);
    
                    }

                    // If we've found everything, break
                    if(saved_entries.length == expected_number_of_entries){
                        break;
                    }
                }
                
                // Check for the expected number of entries and the ones we got
                if(saved_entries.length != expected_number_of_entries){
                    throw new Error('Missing data');
                }
                
                // Resolve promise with the entries all sorted
                resolve(sortEntries(saved_entries));
    
            } catch(err) {
                
                // Retrieve the missing data
                getOuraData(this.parent().parent(), this, data_type, start, end)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
                
            }
        })
    }
}