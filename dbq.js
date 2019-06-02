const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const Client = require('./config/models');

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.log(err);
    })

var person;

person = Client.findOne({$or: [ {username: 'alec_mather' }, {email: 'dddd@gmail.com'} ] })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })