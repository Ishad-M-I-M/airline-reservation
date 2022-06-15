const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

// controllers
const airportController = require('./controllers/airportController');
const routeController = require('./controllers/routeController');
const aircraftController = require('./controllers/aircraftController');
const flightScheduleController = require('./controllers/flightScheduleController');
const reportController = require('./controllers/reportController');
const controller = require('./controllers/controller');
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
});

db.connect(function(err) {
    if(err) {
        console.log("DB error");
        throw err;
    }
});

const sessionStore = new MySQLStore({
    expiration : (365 * 86400 * 1000),
    endConnectionOnClose: false,
}, db);

app.use(session({
    key: 'fsasfsfafawfrhykuytjdafapsovapjv32fq',
    secret: 'abc2idnoin2^*(doaiwu',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: (365 * 86400 * 1000),
        httpOnly: false,
    }
}));

app.use('/airport', airportController );
app.use('/route', routeController );
app.use('/aircraft', aircraftController);
app.use('/flightSchedule', flightScheduleController);
app.use('/report', reportController);
app.use('/', controller);

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });

app.listen(3001);

console.log("Testing server");