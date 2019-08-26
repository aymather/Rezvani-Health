// Requires
const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('./config/keys').PORT;
const path = require('path');
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

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set routs directory
app.use('/', require('./routes/login'));
app.use('/', require('./routes/groups'));
app.use('/', require('./routes/clients'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/retreats'));

app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Now listening on port ${PORT}`);
})