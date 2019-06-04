const User = require('./config/models');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.log(err);
    })

// const user = new User({
//     firstname: 'allll',
//     lastname: 'mayther',
//     gender: 'male',
//     username: 'allll',
//     password: '123',

// })

// console.log(user);

// user.save();

User.findOne({ username: 'al' })
    .then(user => {
        user.oura_api.oura_access_token = '123';
        user.save();
    })
    .catch(err => {
        console.log(err);
    })

