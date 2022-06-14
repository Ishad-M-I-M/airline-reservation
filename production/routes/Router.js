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
        this.getAircrafts(app,db);
        this.deleteAircraft(app, db);
        this.getLocations(app, db);
        this.saveAirport(app, db);
        this.fetchPassengerDetailsReport(app, db);
        this.fetchTotalRevenueReport(app, db);
        this.fetchPassengerCountReport(app, db);
        this.fetchBookingReport(app, db);
        this.fetchPastFlightDetailsReport(app, db);
        this.fetchFlightSchedulesDetails(app, db);
        this.deleteFlightSchedule(app, db);
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
                            from (select route_id,code as origin from route inner join airport on origin=airport_id) as origin 
                            natural join 
                                (select route_id,code as destination from route inner join airport on destination=airport_id) as destination; `
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
                        console.log(data);
                        res.json({
                            success:true,
                            airports: data,
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


    bookTicket(app, db) {
        app.post("/bookTicket", (req, res) => {
            if(req.session.userID) {
                db.query("SELECT cost FROM flight LEFT JOIN flight_cost USING(flight_id) WHERE flight_id=? AND class=?", [req.body.flight_id, req.body.class], (err, data1, fields)=>{
                    if(err) {
                        console.log(err);
                        res.status(500);
                        res.json({
                            success:false,
                            msg: "Error Fetching the Cost of the Flight",
                        });
                        return;
                    }else{
                        db.query("CALL book_ticket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[req.body.passenger_id, req.body.passenger_name, req.body.date, req.body.passenger_address, req.session.userID, req.body.flight_id, req.body.seat_number, req.body.date, req.body.class, data1[0].cost], (err, fields)=>{
                            if(err) {
                                res.status(500);
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

    getAircrafts(app, db){
        app.get('/aircraft', (req, res)=>{
            if(req.session.userID) {
                db.query('SELECT * from aircraft', (err, data) => {
                    if(err){
                        res.status(500);
                        res.json({
                            success: false
                        });
                    }
                    else{
                        res.json({
                            success: true,
                            aircrafts: data 
                        })
                    }
                    
                })
            }else {
                req.json({
                    success:false,
                });
            }
        });
    }

    deleteAircraft(app, db){
        app.delete('/aircraft/:id', (req,res) => {
            if(req.session.userID) {
                db.query(`DELETE FROM aircraft WHERE aircraft_id=? `,[req.params.id]
                , (err)=>{
                    if(err) {
                        res.status(500);
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
        })
    }

    getLocations(app, db){
        app.get('/location', (req, res) => {
            db.query('SELECT * from port_location_with_parent', (err, data)=>{
                if (err) {
                    res.status(500);
                    res.json({success: false});
                }
                else{
                    res.json({
                        success: true,
                        locations: data
                    })
                }
            });
        });
    }

    saveAirport(app, db){
        app.post('/airport', async (req, res)=>{
            db.query('INSERT INTO airport(code,name) VALUES (?, ?)', [req.body.code, req.body.name], (err)=>{
                if(err){
                    res.status(500);
                    console.log(err);
                }
            });
            let locations = [{location: req.body.code, exist: false}, ...req.body.location];
            let parent_id = null;

            while(locations.length > 0){
                let location = locations.pop();
                if (location.exist){
                    parent_id = location.id;
                }
                else{
                    let res = await new Promise((resolve, reject) => {
                        db.query('INSERT INTO port_location(location, parent_id) VALUES (?, ? )', [location.location, parent_id], async (err, data)=>{
                            if(err){
                                reject("Failed to execute");
                            }
                            if(data){
                                let insertId = await data.insertId;
                                resolve(insertId);
                            }
                            else{
                                reject("Database error");
                            }
                            
                        });
                    });
                    
                    parent_id = res;
                }
            }

            res.json({success: true});
        });
    }

    fetchPassengerDetailsReport(app, db) {
        app.post('/loadPassengerDetailsReport', (req, res) => {
            if (req.session.userID) {
                if(req.body.below === true) {
                    if(req.body.above === true) {
                        db.query('SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT (f1.takeoff_time > f2.takeoff_time) AND aircraft.tail_number = ?',[req.body.flight],(err, data, fields) => {
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
                    } else {
                        db.query('SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) < 18 AND aircraft.tail_number = ?',[req.body.flight],(err, data, fields) => {
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
                    }
                } else {
                    if(req.body.above === true) {
                        db.query('SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) > 17 AND aircraft.tail_number = ?',[req.body.flight],(err, data, fields) => {
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
            }
        })
    }

    fetchTotalRevenueReport(app, db) {
        app.post('/loadTotalRevenueReport', (req, res) => {
            if (req.session.userID) {
                if (req.body.aircraft_id === '') {
                    db.query('SELECT aircraft.model, SUM(ticket.paid) AS Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 GROUP BY aircraft.model ORDER BY aircraft.aircraft_id;',(err, data, fields) => {
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
                } else {
                    db.query('SELECT aircraft.model, SUM(ticket.paid) as Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 AND aircraft.model = ?',[req.body.aircraft_id],(err, data, fields) => {
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
                }
            }
        })
    }

    fetchPassengerCountReport(app, db) {
        app.post('/loadPassengerCountReport', (req, res) => {
            if (req.session.userID) {
                if (req.body.Destination === '') {
                    if (req.body.Enddate !== '' && req.body.Startdate !== '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code;',[req.body.Enddate, req.body.Startdate],(err, data, fields) => {
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
                    
                    } else if (req.body.Enddate == '' && req.body.Startdate !== '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code',[req.body.Startdate],(err, data, fields) => {
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
                    } else if (req.body.Enddate !== '' && req.body.Startdate == '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ?) AND ticket.is_boarded = 1 GROUP BY airport.code',[req.body.Enddate],(err, data, fields) => {
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
                    } else {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE ticket.is_boarded = 1 GROUP BY airport.code',(err, data, fields) => {
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
                    }
                } else {
                    if (req.body.Enddate !== '' && req.body.Startdate !== '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1',[req.body.Enddate, req.body.Startdate, req.body.Destination],(err, data, fields) => {
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
                    
                    } else if (req.body.Enddate == '' && req.body.Startdate !== '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1',[req.body.Startdate, req.body.Destination],(err, data, fields) => {
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
                    } else if (req.body.Enddate !== '' && req.body.Startdate == '') {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ?) AND airport.code = ? AND ticket.is_boarded = 1',[req.body.Enddate, req.body.Destination],(err, data, fields) => {
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
                    } else {
                        db.query('SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE airport.code = ? AND ticket.is_boarded = 1',[req.body.Destination],(err, data, fields) => {
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
                    }
                }
            }
        })
    }

    fetchBookingReport(app, db) {
        app.post('/loadBookingReport', (req, res) => {
            if (req.session.userID) {
                if (req.body.Enddate == '' && req.body.Startdate !== '') {
                    db.query('SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type',[req.body.Startdate],(err, data, fields) => {
                        if(err){
                            res.json({
                                success: false,
                                entry: true,
                            });
                            return false;
                        }else{
                            res.json({
                                success: true,
                                entry: true,
                                data: data,
                            });
                            return true;
                        }
                    });
                
                } else if (req.body.Enddate !== '' && req.body.Startdate == '') {
                    db.query('SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type',[req.body.Enddate],(err, data, fields) => {
                        if(err){
                            res.json({
                                success: false,
                                entry: true,
                            });
                            return false;
                        }else{
                            res.json({
                                success: true,
                                entry: true,
                                data: data,
                            });
                            return true;
                        }
                    });
                
                } else if (req.body.Enddate !== '' && req.body.Startdate !== '') {
                    db.query('SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type',[req.body.Enddate, req.body.Startdate],(err, data, fields) => {
                        if(err){
                            res.json({
                                success: false,
                                entry: true,
                            });
                            return false;
                        }else{
                            res.json({
                                success: true,
                                entry: true,
                                data: data,
                            });
                            return true;
                        }
                    });  
                
                } else if (req.body.Enddate == '' && req.body.Startdate == ''){
                    res.json({
                        success: false,
                        entry: false,
                    });
                    return false;
                }
            }
        })
    }

    fetchPastFlightDetailsReport(app, db) {
        app.post('/loadPastFlightDetailsReport', (req, res) => {
            if (req.session.userID) {
                if (req.body.Origin === '' && req.body.Destination === '') {
                    db.query('SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING takeoff_time < now();',(err, data, fields)=>{
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

                } else if (req.body.Origin === '') {
                    db.query('SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a2.code= ? AND takeoff_time < now();',[req.body.Destination.trim()],(err, data, fields)=>{
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

                } else if (req.body.Destination === '') {
                    db.query('SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND takeoff_time < now();',[req.body.Origin.trim()],(err, data, fields)=>{
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

                } else {
                    db.query('SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND a2.code= ? AND takeoff_time < now();',[req.body.Origin.trim(), req.body.Destination.trim()],(err, data, fields)=>{
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
                }
            }
        })
    }

    fetchFlightSchedulesDetails(app, db){
        app.get('/flightSchedules', (req, res)=>{
            if(req.session.userID) {
                db.query('SELECT flight.flight_id, tail_number, model, a.code AS origin, b.code AS destination, takeoff_time, departure_time FROM flight INNER JOIN aircraft USING(aircraft_id) INNER JOIN route USING(route_id) INNER JOIN airport AS a ON a.airport_id = route.origin INNER JOIN airport AS b ON b.airport_id = route.destination WHERE flight.is_active = 1 ORDER BY flight_id', (err, data, fields)=>{
                    //db.query('SELECT tail_number, model, route_id, takeoff_time, departure_time FROM flight INNER JOIN aircraft USING(aircraft_id) ORDER BY flight_id', (err, data, fields)=>{
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

    deleteFlightSchedule(app, db){
        app.delete('/flightSchedule/:id', (req, res)=>{
            if(req.session.userID) {
                db.query(`UPDATE flight SET flight.is_active = 0 WHERE flight.flight_id =? `,[req.params.id]
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

}

module.exports = Router;