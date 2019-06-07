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

// User.findOne({ username: 'alecmather' })
//     .then(user => {
//         user.groups.forEach(group => {
//             console.log(group);
//             if(group._id == '5cf83ef73ef502c6d5828aa9'){
//                 user.groups[group].remove();
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })
// User.find({ _id: '5cf83ef73ef502c6d5828aa9' })
//     .then(query => {
//         console.log(query);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// User.update(
//     { },
//     { $pull: { _id: '5cf83ef73ef502c6d5828aa9' } },
//     { multi: true }
// )
User.findOne({username:'alecmather'})
    .then(user => {
        console.log(user.groups);
    })
