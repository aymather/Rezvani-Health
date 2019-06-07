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

const GroupMemberSchema = new Schema({
    signup_date: {
        type: Object,
        default: moment()
    },
    firstname: { type: String, required: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: String, required: true },
    medications: { type: String },
    Metabolic_Type: { type: String },
    Macros: {
        carb: { type: Number },
        protein: { type: Number },
        fat: { type: Number }
    },
    data: [DataEntry],
    oura_api: {
        oura_access_token: { type: String },
        oura_refresh_token: { type: String }
    },
    oura_userinfo: {
        user_id: { type: String },
        age: { type: Number },
        weight: { type: Number },
        gender: { type: String },
        email: { type: String }
    }
})

const GroupSchema = new Schema({
    created: { type: Object, default: moment() },
    name: { type: String, required: true },
    members: [GroupMemberSchema]
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
    },
    oura_userinfo: {
        user_id: { type: String },
        age: { type: Number },
        weight: { type: Number },
        gender: { type: String },
        email: { type: String }
    },
    oura_api: {
        oura_access_token: { type: String },
        oura_refresh_token: { type: String }
    },
    groups: [GroupSchema]
});

const User = mongoose.model('users', UserSchema);
module.exports = User;