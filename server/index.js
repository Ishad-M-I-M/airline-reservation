const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session);
require('dotenv').config({
    path: '.env'
});

// controllers
const airportController = require('./controllers/airportController');
const routeController = require('./controllers/routeController');
const aircraftController = require('./controllers/aircraftController');
const flightScheduleController = require('./controllers/flightScheduleController');
const reportController = require('./controllers/reportController');
const discountController = require('./controllers/discountController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const controller = require('./controllers/controller');

// middlewares
const authenticate = require('./middlewares/authenticate');


const db = require('./db');
app.use(express.json());

const sessionStore = new KnexSessionStore({
    knex: db,
    clearInterval: (365 * 86400 * 1000),
    disableDbCleanup: true
});

app.use(session({
    key: 'fsasfsfafawfrhykuytjdafapsovapjv32fq',
    secret: 'abc2idnoin2^*(doaiwu',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (365 * 86400 * 1000),
        httpOnly: false,
    }
}));

app.use('/airport', airportController);
app.use('/route', routeController);
app.use('/aircraft', aircraftController);
app.use('/flightSchedule', flightScheduleController);
app.use('/report',authenticate.isAuthorized, reportController);
app.use('/discount',authenticate.isAuthorized, discountController);
app.use('/auth', authController);
app.use('/user',authenticate.isAuthorized, userController);
app.use('/', controller);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001

console.log(`Server Mode : ${process.env.NODE_ENV}`);
app.listen(PORT, ()=>{
    console.log(`serving on ${PORT}`);
});
