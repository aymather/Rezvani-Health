// Requires
const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('./config/keys').PORT;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes/index')

// Init App
const app = express();

// Routes
app.use(routes);

// Set View engine (EJS)
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Set routs directory
app.use('/', require('./routes/index'));

app.set(path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})