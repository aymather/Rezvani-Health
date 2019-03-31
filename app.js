// Requires
const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('./config/keys').PORT;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

// Init App
const app = express();

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

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(express.static(path.join(__dirname, 'public')));
app.set(path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})