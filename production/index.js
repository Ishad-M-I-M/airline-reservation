const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./routes/Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kv@25031999',
    database: 'bairways',
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

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(3001);

console.log("Testing server");