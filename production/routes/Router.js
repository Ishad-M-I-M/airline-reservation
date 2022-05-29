const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.fetchFlightRoute(app, db);
        this.fetchAircraft(app, db);
        this.addFlight(app, db);
        this.getAirportCode(app, db);
        this.fetchClerkFlightDetails(app, db);
        this.fetchBookFlightDetails(app, db);
        this.fetchRouteDetails(app,db);
        this.deleteRoute(app, db);
        this.fetchAirportDetails(app, db);
        this.deleteAirport(app, db);
        this.fetchSeatNumber(app, db);
        this.fetchSeatNumber(app, db);
        this.bookTicket(app, db);
        this.Update_Discount(app,db);
        // this.Update_Discount_Gold(app,db);
        this.ADD_FLIGHT(app,db);
        this.fetchDiscountDetails(app, db);
        this.fetchAirport(app, db);
        this.addAirport(app,db);
        this.addRoute(app,db);
    }

    login(app , db) {
        app.post('/login', (req, res) => {
            // console.log("Request to login");
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
                            // console.log(`Successfully sending back ${data[0].email}`);
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

    addFlight(app, db) {
        app.post('/addFlight', (req, res) => {
            if(req.session.userID) {
                let aircraft_id = req.body.aircraft_id;
                let route_id = req.body.route_id;
                let takeoff_time = req.body.takeoff_time;
                let landing_time = req.body.landing_time;
                db.query('INSERT INTO flight (aircraft_id, route_id, takeoff_time, departure_time) VALUES (?, ?, ?, ?)',[aircraft_id, route_id, takeoff_time, landing_time],(err, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                            msg:'Insertion Failed, Try again',
                        });
                    }else {
                        res.json({
                            success: true,
                            msg:'Insertion Success'
                        });
                    }
                });
            }else {
                res.json({
                    success:false,
                    msg:'Login to the System'
                });
            }
        });
    }

    getAirportCode(app, db) {
        app.post('/airportCodes',(req, res)=>{
            if(req.session.userID) {
                db.query('SELECT code from airport', (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success: false,
                        });
                    }else {
                        res.json({
                            success: true,
                            codes : data
                        });
                    }
                })
            } else {
                res.json({
                    success: false,
                });
            }
        })
    }

    fetchClerkFlightDetails(app, db) {
        app.post('/fetchFlight/clerk', (req, res)=>{
            if(req.session.userID) {
                if(req.body.flight_id !== '' && (req.body.aircraft_id === '' && req.body.origin === '' && req.body.destination === '')) {
                    if(req.body.past === true) {
                        if(req.body.future === true) {
                            db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where flight_id=?',[req.body.flight_id],(err, data, fields) => {
                                if(err){
                                    res.json({
                                        success: false,
                                    });
                                    return false;
                                }else{
                                    res.json({
                                        success: true,
                                        data: data,
                                    });
                                    return true;
                                }
                            });
                        }else {
                            db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time < now() and flight_id=?',[req.body.flight_id],(err, data, fields)=>{
                                if(err) {
                                    res.json({
                                        success: false,
                                    });
                                    return false;
                                }else {
                                    res.json({
                                        success: true,
                                        data:data,
                                    });
                                    return true;
                                }
                            });
                        }
                    }else {
                        if(req.body.future === true) {
                            db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() and flight_id=?',[req.body.flight_id],(err, data, fields) => {
                                if(err){
                                    res.json({
                                        success: false,
                                    });
                                    return false;
                                }else {
                                    res.json({
                                        success: true,
                                        data:data,
                                    });
                                    return true;
                                }
                            });
                        }else {
                            res.json({
                                success: false,
                            });
                            return false;
                        }
                    }
                }else if(req.body.aircraft_id !== '' && (req.body.flight_id === '' && req.body.origin === '' && req.body.destination === '')){
                if(req.body.past === true){
                    if(req.body.future === true) {
                        db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =?',[req.body.aircraft_id],(err, data, fields)=>{
                            if(err) {
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else {
                                res.json({
                                    success: true,
                                    data: data,
                                });
                                return true;
                            }
                        });
                    }else {
                        db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =? and takeoff_time < now()'[req.body.aircraft_id],(err, data, fields) => {
                            if(err) {
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else {
                                res.json({
                                    success: true,
                                    data: data,
                                });
                                return true;
                            }
                        });
                    }
                }else {
                    if(req.body.future === true) {
                        db.query('select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =? and takeoff_time > now()',[req.body.aircraft_id],(err, data, fields)=>{
                            if(err) {
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else {
                                res.json({
                                    success: true,
                                    data:data,
                                });
                                return true;
                            }
                        });
                    }else {
                        res.json({
                            success: false,
                        });
                        return false;
                    }
                }
            }else if((req.body.origin !== '' && req.body.destination !== '') && (req.body.flight_id === '' && req.body.aircraft_id === '')){
                if(req.body.past === true) {
                    if(req.body.future === true) {
                        db.query('select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=?',[req.body.origin.trim(), req.body.destination.trim()],(err, data, fields) => {
                        console.log("READ");

                            if(err){
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else{
                                res.json({
                                    success: true,
                                    data: data,
                                });
                                return true;
                            }
                        });
                    }else {
                        db.query('select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=? and takeoff_time < now()',[req.body.origin.trim(), req.body.destination.trim()],(err, data, fields)=>{
                            if(err) {
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else {
                                res.json({
                                    success: true,
                                    data:data,
                                });
                                return true;
                            }
                        });
                    }
                }else {
                    if(req.body.future === true) {
                        db.query('select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=? and takeoff_time > now()',[req.body.origin.trim(), req.body.destination.trim()],(err, data, fields) => {
                            if(err){
                                res.json({
                                    success: false,
                                });
                                return false;
                            }else {
                                res.json({
                                    success: true,
                                    data:data,
                                });
                                return true;
                            }
                        });
                    }else {
                        res.json({
                            success: false,
                        });
                        return false;
                    }
                }
            }else {
                res.json({
                    success: false,
                });
                return false;
            }
        }});
    }

    fetchBookFlightDetails(app, db) {
        app.post('/bookingFlights',(req, res) => {
            if(req.session.userID) {
                db.query('select flight_id, takeoff_time, departure_time, model, total_seats, Economy_seats, Business_seats, Platinum_seats, airport1.code as origin, airport2.code as destination from flight inner join aircraft using(aircraft_id) inner join route using (route_id) inner join airport as airport1 on airport1.airport_id=route.origin inner join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() order by takeoff_time', (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                            data: data,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    fetchRouteDetails(app, db){
        app.get('/route', (req, res)=>{
            if(req.session.userID) {
                db.query(`select route_id as id, origin, destination
                            from (select route_id,location as origin from route inner join port_location on origin=id) as origin 
                            natural join 
                                (select route_id,location as destination from route inner join port_location on destination=id) as destination; `
                , (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                            data: data,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    deleteRoute(app, db){
        app.delete('/route/:id', (req, res)=>{
            if(req.session.userID) {
                db.query(`DELETE FROM route WHERE route_id=? `,[req.params.id]
                , (err)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    fetchAirportDetails(app, db){
        app.get('/airport', (req, res)=>{
            if(req.session.userID) {
                db.query(`select * from airport_locations`
                , (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                            data: data,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    deleteAirport(app, db){
        app.delete('/airport/:id', (req, res)=>{
            if(req.session.userID) {
                db.query(`DELETE FROM airport WHERE airport_id=? `,[req.params.id]
                , (err)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    fetchSeatNumber(app, db) {
        app.post('/loadSeatnumber', (req, res) => {
            if(req.session.userID) {
                let flight_id = parseInt(req.body.flight_id);
                let seat_inclass = req.body.class;
                let stmt = '';
                if(seat_inclass=='Economy'){
                    stmt = 'SELECT get_Economy_seats(?)';
                }else if(seat_inclass=='Business'){
                    stmt = 'SELECT get_Business_seats(?)';
                }else{
                    stmt = 'SELECT get_Platinum_seats(?)';
                }

                db.query(stmt, [flight_id], (err, data, fields) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                        });
                    }else {
                        res.json({
                            success: true,
                            seat_number: data[0],
                        });
                    }
                });
            }
        });
    }

    fetchSeatNumber(app, db) {
        app.post('/loadSeatnumber', (req, res) => {
            if(req.session.userID) {
                let flight_id = parseInt(req.body.flight_id);
                let seat_inclass = req.body.class;
                let stmt = '';
                if(seat_inclass=='Economy'){
                    stmt = 'SELECT get_Economy_seats(?)';
                }else if(seat_inclass=='Business'){
                    stmt = 'SELECT get_Business_seats(?)';
                }else{
                    stmt = 'SELECT get_Platinum_seats(?)';
                }

                db.query(stmt, [flight_id], (err, data, fields) => {
                    if(err) {
                        console.log(err);
                        res.json({
                            success: false,
                        });
                    }else {
                        res.json({
                            success: true,
                            seat_number: data[0],
                        });
                    }
                });
            }
        });
    }

    Update_Discount(app,db){
        app.post('/discount',(req ,res) =>{
            console.log(req.body.gold);
            let gold ;
            let discount ;

            if(req.body.gold != null){
                gold = req.body.gold 
            }else{
                gold = -1;
            }
            if(req.body.discount != null){
                discount = req.body.discount 
            }else{
                discount = -1;
            }
            db.query('CALL UpdateDiscount(?,?)',[gold,discount],(err,fields)=>{
                if(err) {
                    console.log(err);
                    res.json({
                        success:false,
                        msg:'Insertion Failed, Try again',
                    });
                }else {
                    console.log("Success")
                    res.json({
                        success: true,
                        msg:'Insertion Success'
                    });
                }

            })
            

        });
    }


    ADD_FLIGHT(app, db){
        app.post('/addAircraft',(req,res)=>{
            let model = req.body.model;
            let seats = req.body.seats;
            let economy = req.body.economy;
            let business = req.body.business;
            let platinum = req.body.platinum;
            console.log(`${model}`);
            db.query('INSERT INTO aircraft (model,total_seats,Economy_seats,Business_seats,Platinum_seats) VALUES(?,?,?,?,?)',[model,seats,economy,business,platinum],(err,fields)=>{
                if(err) {
                    console.log(err);
                    res.json({
                        success:false,
                        msg:'Insertion Failed, Try again',
                    });
                }else {
                    console.log("Success")
                    res.json({
                        success: true,
                        msg:'Insertion Success'
                    });
                }

            })



        })
    }


    fetchDiscountDetails(app, db){
        app.get('/discount', (req, res)=>{
            if(req.session.userID) {
                db.query(`select * from discount`
                , (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                            data: data,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    addAirport(app,db){
        app.post('/addAirport',(req ,res) =>{
            let code = req.body.code;
            let address = req.body.address;
            let name = req.body.name;
            console.log(address[0]);
            console.log(code);
            var count = 0;

            db.query(`select count(*) as total from port_location`
            , (err, data, fields)=>{
                if(err) {
                    console.log("error");
                }else {
                    count = data[0].total;
                    console.log(count);
                   
                }
            });

            db.query('insert into port_location(location) values(?)',[address[0]],(err,fields)=>{
                if(err) {
                    console.log(err);
                    console.log("error in parent port");
                }else {
                    console.log("Success parent")
                }

            });
            console.log(count);
            for (let i = 1; i < address.length; i++) {
                db.query('insert into port_location values(?,?)',[address[i],count+i],(err,fields)=>{
                    if(err) {
                        console.log(err);
                        console.log("error in loop");
                    }else {
                        console.log("Success in loop")
                    }
    
                });
              }

              db.query('insert into port_location values(?,?)',[code,count+address.length],(err,fields)=>{
                if(err) {
                    console.log(err);
                    console.log("error in loop");
                }else {
                    console.log("Success")
                }

            });

            db.query('insert into airport values(?,?)',[code,name],(err,fields)=>{
                if(err) {
                    console.log(err);
                    console.log("airport not added");
                }else {
                    console.log("port added");
                }

            });
            

        })
    }

    fetchAirport(app, db){
        app.get('/airportDetails', (req, res)=>{
            if(req.session.userID) {
                db.query(`select airport_id,code from airport`
                , (err, data, fields)=>{
                    if(err) {
                        res.json({
                            success:false,
                        });
                    }else {
                        res.json({
                            success:true,
                            data: data,
                        });
                    }
                });
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }


    addRoute(app,db){
        app.post('/addRoute', (req, res) => {
                let origin = req.body.Origin;
                let destination = req.body.Destination;
                console.log(`${origin},${destination}`);
                db.query('INSERT INTO route (origin,destination) VALUES(?,?) ',[origin,destination],(err, fields)=>{
                    if(err) {
                        console.log(err);
                        res.json({
                            success:false,
                            msg:'Insertion Failed, Try again',
                        });
                    }else {
                        console.log("Success")
                        res.json({
                            success: true,
                            msg:'Insertion Success'
                        });
                    }
                });
        })
        // app.post('/addRoute',(req,res)=>{
        //     let origin = req.body.origin;
        //     let destination = req.body.destination;
        //     console.log(`${origin},${destination}`);
        //     db.query('INSERT INTO route (origin,destination) VALUES(?,?)',[origin,destination],
        //     (err,fields) =>{
        //         if(err) {
        //             console.log("Error");
        //             res.json({
        //                 msg:"Not added"
        //             });
        //         }else {
        //             console.log("Added");
        //             res.json({
        //                 msg:"added"
        //             });
        //         }

        //     }
            
            
        //     );
        // })
    }


    bookTicket(app, db) {
        app.post("/bookTicket", (req, res) => {
            if(req.session.userID) {
                db.query("SELECT cost FROM flight LEFT JOIN flight_cost USING(flight_id) WHERE flight_id=? AND class=?", [req.body.flight_id, req.body.class], (err, data1, fields)=>{
                    if(err) {
                        console.log(err);
                        res.json({
                            success:false,
                            msg: "Error Fetching the Cost of the Flight",
                        });
                        return;
                    }else{
                        db.query("CALL book_ticket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[req.body.passenger_id, req.body.passenger_name, req.body.date, req.body.passenger_address, req.session.userID, req.body.flight_id, req.body.seat_number, req.body.date, req.body.class, data1[0].cost], (err, fields)=>{
                            if(err) {
                                res.json({
                                    success: false,
                                    msg: "Error Booking the Ticket",
                                });
                                return;
                            }else {
                                res.json({
                                    success: true,
                                    msg:"Booking Successful",
                                });
                                return;
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports = Router;