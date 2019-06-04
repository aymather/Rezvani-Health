// Requires
const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('./config/keys').PORT;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Init App
const app = express();

// Passport config
require('./config/passport')(passport);

// Connect to DataBase
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to database...');
    })
    .catch((err) => { 
        console.log(err);
    })

// Set View engine (EJS)
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global vars for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Moment.js
var moment = require('moment');
var shortDateFormat = "MM-DD-YYYY";
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

// Set routs directory
app.use('/', require('./routes/rmrcalculator'));
app.use('/', require('./routes/home'));
app.use('/', require('./routes/createprofile'));
app.use('/', require('./routes/database'));
app.use('/', require('./routes/writeentry'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/getsleepdata'));
app.use('/', require('./routes/getactivitydata'));
app.use('/', require('./routes/getreadinessdata'));
app.use('/', require('./routes/profile'));
app.use('/', require('./routes/journal'));

app.use(express.static(path.join(__dirname, 'public')));
app.set(path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})