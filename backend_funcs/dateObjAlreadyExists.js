// This is used in conjunction with the filter method
// to look for data that already exists in our database

module.exports = function dateObjAlreadyExists(date, arr){
    for(entry of arr){
        if(entry.summary_date == date){ 
            return false; 
        }
    }
    return true;
}