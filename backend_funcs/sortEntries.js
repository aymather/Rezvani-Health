const moment = require('moment');

// Sorts back a history of oura data that we've pull into our db
function sortEntries(arr){
    return arr.sort((a,b) => new moment(a.summary_date).format('YYYYMMDD') - new moment(b.summary_date).format('YYYYMMDD'))
}

module.exports = sortEntries;