const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const get_member_data = require('./model_methods').get_member_data;

// Copy of Oura Activity API response
const ActivitySchema = new Schema({
    summary_date: { type: String },
    day_start: { type: String },
    day_end: { type: String },
    timezone: { type: Number },
    score: { type: Number },
    score_stay_active: { type: Number },
    score_move_every_hour: { type: Number },
    score_meet_daily_targets: { type: Number },
    score_training_frequency: { type: Number },
    score_training_volume: { type: Number },
    score_recovery_time: { type: Number },
    daily_movement: { type: Number },
    non_wear: { type: Number },
    rest: { type: Number },
    inactive: { type: Number },
    inactivity_alerts: { type: Number },
    low: { type: Number },
    medium: { type: Number },
    high: { type: Number },
    steps: { type: Number },
    cal_total: { type: Number },
    cal_active: { type: Number },
    met_min_inactive: { type: Number },
    met_min_low: { type: Number },
    met_min_medium_plus: { type: Number },
    met_min_medium: { type: Number },
    met_min_high: { type: Number },
    average_met: { type: Number },
    class_5min: { type: String },
    met_1min: { type: Array }
})

// Copy of Oura Readiness API response
const ReadinessSchema = new Schema({
    summary_date: { type: String },
    period_id:  { type: Number },
    score:  { type: Number },
    score_previous_night:  { type: Number },
    score_sleep_balance:  { type: Number },
    score_previous_day:  { type: Number },
    score_activity_balance:  { type: Number },
    score_resting_hr:  { type: Number },
    score_recovery_index:  { type: Number },
    score_temperature:  { type: Number }
})

// Copy of Oura Sleep API response
const SleepSchema = new Schema({
    summary_date: { type: String },
    period_id: { type: Number },
    is_longest: { type: Number },
    timezone: { type: Number },
    bedtime_start: { type: String },
    bedtime_end: { type: String },
    score: { type: Number },
    score_total: { type: Number },
    score_disturbances: { type: Number },
    score_efficiency: { type: Number },
    score_latency: { type: Number },
    score_rem: { type: Number },
    score_deep: { type: Number },
    score_alignment: { type: Number },
    total: { type: Number },
    duration: { type: Number },
    awake: { type: Number },
    light: { type: Number },
    rem: { type: Number },
    deep: { type: Number },
    onset_latency: { type: Number },
    restless: { type: Number },
    efficiency: { type: Number },
    midpoint_time: { type: Number },
    hr_lowest: { type: Number },
    hr_average: { type: Number },
    rmssd: { type: Number },
    breath_average: { type: Number },
    temperature_delta: { type: Number },
    hypnogram_5min: { type: String },
    hr_5min: { type: Array },
    rmssd_5min: { type: Array }
})

// Biometrics we collect
const DataEntry = new Schema({
    date: {
        type: Object,
        default: moment()
    },
    meta: {
        RMR: { type: Number },
        HDL: { type: Number },
        LDL: { type: Number },
        TC: { type: Number },
        Ratio: { type: Number },
        Trigs: { type: Number },
        BFP: { type: Number },
        Weight: { type: Number },
        Caloric_Level: { type: Number },
        Hemoglobin: { type: Number }
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
    },
    readiness: [ReadinessSchema],
    sleep: [SleepSchema],
    activity: [ActivitySchema]
})

// Returns a sorted array of data from our database
// If any part of the data doesn't exist in our database,
// then just let getOuraData() make API request and handle the rest
GroupMemberSchema.methods.get_data = get_member_data;

const GroupSchema = new Schema({
    created: { type: Object, default: moment() },
    name: { type: String, required: true },
    members: [GroupMemberSchema]
})

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    signup_date: {
        type: Object,
        default: moment()
    },
    groups: [GroupSchema]
});

const User = mongoose.model('users', UserSchema);
module.exports = User;