const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.fetchFlightRoute(app, db);
        this.fetchAircraft(app, db);
    }

    login(app , db) {
        app.post('/login', (req, res) => {
            console.log("Request to login");
            let email = req.body.email;
            let password = req.body.password;

            email = email.toLowerCase().trim();

            if(email.length > 50 || password.length > 50){
                res.json({
                    success: false,
                    msg: 'Not an authorized request'
                });
                return;
            }

            let cols = [email];
            db.query("SELECT * FROM user WHERE email = ? LIMIT 1", cols, (err, data, fields) => {

                if(err) {
                    res.json({
                        success: false,
                        msg: "Error occured while querying the data",
                    })
                    return;
                }

                //Found a user
                if(data && data.length === 1) {
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified)=>{
                        if(verified) {
                            req.session.userID = data[0].user_id;
                            res.json({
                                success:true,
                                email: data[0].email,
                                role: data[0].role
                            })
                            console.log(`Successfully sending back ${data[0].email}`);
                            return;
                        }else {
                            res.json({
                                success:false,
                                msg : "Invalid password",
                            })
                        }
                    })
                } else {
                    res.json({
                        success:false,
                        msg: "User not found"
                    })
                }
            });
        });
    }

    logout(app, db) {

        app.post('/logout', (req, res)=>{

            if(req.session.userID) {

                req.session.destroy();
                res.json({
                    success:true,

                })

                return true;
            } else {
                res.json({
                    success: false,
                })

                return false;
            }
        })
    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res)=>{
            if(req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE user_id = ? LIMIT 1', cols, (err, data, fields) => {
                    if(data && data.length === 1) {
                        res.json({
                            success: true,
                            email: data[0].email,
                            role: data[0].role,
                        });

                        return true;
                    }else  {
                        res.json({
                            success: false,
                        });
                    }
                });
            }else {
                res.json({
                    success: false
                })
            }
        });
    }

    fetchFlightRoute(app, db) {

        app.post('/flightroute', (req, res) => {
            if(req.session.userID) {
                console.log("Reached Server");
                db.query('SELECT route_id, a1.code AS origin, a2.code AS destination FROM route LEFT JOIN airport a1 ON route.origin = a1.airport_id LEFT JOIN airport a2 ON route.destination=a2.airport_id',(err, data, fields) => {
                    res.json({
                        success: true,
                        details: data,
                    });
                })
            }else {
                res.json({
                    success: false,
                    msg: 'Login to the system'
                });
            }
        });

    }

    fetchAircraft(app, db) {
        app.post('/aircraft', (req, res) => {
            if(req.session.userID) {
                db.query('SELECT aircraft_id, model from aircraft', (err, data, fields)=>{
                    res.json({
                        success: true,
                        details: data,
                    });
                });
            }else {
                res.json({
                    success: false,
                    msg: 'Login to the system'
                });
            }
        });
    }
}

module.exports = Router;