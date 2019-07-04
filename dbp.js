const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const User = require('./config/models');
const Schema = mongoose.Schema;

mongoose.connect(db, {useNewUrlParser: true})
    .then(async () => {
        console.log("Connected to db...");

        const user = await User.findOne({username: 'alecmather'});

        user.groups[0].members[0].getSummary();
    })
    .catch(err => {
        console.log(err);
    })
