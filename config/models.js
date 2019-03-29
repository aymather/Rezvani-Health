const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataEntry = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        RMR: {
            type: Number
        },
        BMR: {
            type: Number
        },
        Caloric_Level: {
            type: Number
        }
    }
})

const ClientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    data: [DataEntry],
    signup_date: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model('clients', ClientSchema);
module.exports = Client;