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
        HDL: {
            type: Number
        },
        LDL: {
            type: Number
        },
        TC: {
            type: Number
        },
        Ratio: {
            type: Number
        },
        Trigs: {
            type: Number
        },
        BFP: {
            type: Number
        },
        Weight: {
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
    username: {
        type: String
    },
    gender: {
        type: String
    },
    Metabolic_Type: {
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