const express = require('express');
const db = require('../db');
const router = express.Router();

router.post("/passenger-details", (req, res) => {
    if (req.body.below === true) {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger NATURAL JOIN ticket WHERE ticket.flight_id = ( SELECT flight.flight_id FROM flight NATURAL JOIN aircraft WHERE aircraft.tail_number = ? AND flight.takeoff_time > NOW() ORDER BY flight.takeoff_time ASC LIMIT 1);", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({success: false});
                });
        } else {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger NATURAL JOIN ticket WHERE ticket.flight_id = ( SELECT flight.flight_id FROM flight NATURAL JOIN aircraft WHERE aircraft.tail_number = ? AND flight.takeoff_time > NOW() ORDER BY flight.takeoff_time ASC LIMIT 1) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) < 18;", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    } else {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger NATURAL JOIN ticket WHERE ticket.flight_id = ( SELECT flight.flight_id FROM flight NATURAL JOIN aircraft WHERE aircraft.tail_number = ? AND flight.takeoff_time > NOW() ORDER BY flight.takeoff_time ASC LIMIT 1) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) > 17;", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({success: false})
                })
        } else {
            return res.status(500).json({
                success: false,
            });
        }
    }
});

router.post("/total-revenue", (req, res) => {
    if (req.body.aircraft_id === "") {
        db.raw("SELECT aircraft.model, SUM(ticket.paid) AS Total_Revenue FROM ticket INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND status = 1 GROUP BY aircraft.model;",).then((result) => {
            return res.json({success: true, data: result[0]});
        })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            })

    } else {
        db.raw("SELECT aircraft.model, SUM(ticket.paid) as Total_Revenue FROM ticket INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND status = 1 AND aircraft.model = ?", [req.body.aircraft_id],).then((result) => {
            return res.json({success: true, data: result[0]});
        })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

    }
});

router.post("/passenger-count", (req, res) => {
    if (req.body.Destination === "") {
        if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) GROUP BY airport.code;", [req.body.Enddate, req.body.Startdate])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false})
            })
        } else if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time < ?) GROUP BY airport.code;", [req.body.Startdate],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time > ?) GROUP BY airport.code;", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) GROUP BY airport.code;",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        }
    } else {
        if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND airport.code = ?;", [req.body.Enddate, req.body.Startdate, req.body.Destination],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time < ?) AND airport.code = ?;", [req.body.Startdate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE NOT (flight.takeoff_time > ?) AND airport.code = ?;", [req.body.Enddate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN ticket USING(flight_id) WHERE airport.code = ?;", [req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    }
});

router.post("/bookings", (req, res) => {
    if (req.session.userID) {
        if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT class, COUNT(class) AS Booking_Count FROM ticket WHERE NOT (ticket.date < ?) GROUP BY class;", [req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
            db.raw("SELECT class, COUNT(class) AS Booking_Count FROM ticket WHERE NOT (ticket.date > ?) GROUP BY class;", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT class, COUNT(class) AS Booking_Count FROM ticket WHERE NOT (ticket.date > ? OR ticket.date < ?) GROUP BY class;", [req.body.Enddate, req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate === "" && req.body.Startdate === "") {
            db.raw("SELECT class, COUNT(class) AS Booking_Count FROM ticket GROUP BY class;",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    }
});

router.post("/past-flight-details", (req, res) => {
    if (req.session.userID) {
        if (req.body.Origin === "" && req.body.Destination === "") {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(is_boarded) AS Passenger_Count FROM ticket INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE takeoff_time < now() AND status = 1 GROUP BY flight_id;",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Origin === "") {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(is_boarded) AS Passenger_Count FROM ticket INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a2.code= ? AND takeoff_time < now() AND status = 1 GROUP BY flight_id;", [req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Destination === "") {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(is_boarded) AS Passenger_Count FROM ticket INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a1.code= ? AND takeoff_time < now() AND status = 1 GROUP BY flight_id;", [req.body.Origin.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(is_boarded) AS Passenger_Count FROM ticket INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a1.code= ? AND a2.code= ? AND takeoff_time < now() AND status = 1 GROUP BY flight_id;", [req.body.Origin.trim(), req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    }
});
module.exports = router;