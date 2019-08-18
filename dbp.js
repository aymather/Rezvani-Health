const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const User = require('./config/models');

(async () => {

    await mongoose.connect(db, { useNewUrlParser: true });
    
    var users = await User.find();
    console.log(users);

})()