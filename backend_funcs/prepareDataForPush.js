const dateObjAlreadyExists = require('./dateObjAlreadyExists');
const createPlaceholderData = require('./createPlaceholderData');

module.exports = function prepareDataForPush(client, data, start, end){
    console.log('Inside prepareDataForPush');
    // We need to create placeholders in case there is missing data
    var replacedData = createPlaceholderData(data, start, end);
                                
    // Check if any of the queried data is already in the database
    var filteredData = replacedData[data_type].filter(entry => dateObjAlreadyExists(entry.summary_date, client[data_type]));
    console.log('Finished prepareDataForPush with data: ');
    console.log(filteredData);
    // Return wanted data
    return filteredData;

}