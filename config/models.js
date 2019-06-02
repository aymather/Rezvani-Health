const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const DataEntry = new Schema({
    date: {
        type: Object,
        default: moment()
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
        },
        Blood_Glucose: {
            type: Number
        },
        Hemoglobin: {
            type: Number
        }
    }
})

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    birthday: {
        type: Object
    },
    medications: {
        type: String
    },
    Metabolic_Type: {
        type: String
    },
    data: [DataEntry],
    signup_date: {
        type: Object,
        default: moment()
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;