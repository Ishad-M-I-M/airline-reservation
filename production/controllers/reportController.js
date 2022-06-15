const express = require('express');
const db = require('../db');
const router = express.Router();

router.post("/passenger-details", (req, res) => {
    if (req.body.below === true) {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM flight INNER JOIN booking USING(flight_id) INNER JOIN passenger USING(passenger_id) WHERE takeoff_time = (SELECT MIN(takeoff_time) FROM aircraft LEFT JOIN flight USING(aircraft_id) WHERE takeoff_time > NOW() AND aircraft.tail_number = ?);", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({success: false});
                });
        } else {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM flight INNER JOIN booking USING(flight_id) INNER JOIN passenger USING(passenger_id) WHERE takeoff_time = (SELECT MIN(takeoff_time) FROM aircraft LEFT JOIN flight USING(aircraft_id) WHERE takeoff_time > NOW() AND aircraft.tail_number = ?)  AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) < 18;", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    } else {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM flight INNER JOIN booking USING(flight_id) INNER JOIN passenger USING(passenger_id) WHERE takeoff_time = (SELECT MIN(takeoff_time) FROM aircraft LEFT JOIN flight USING(aircraft_id) WHERE takeoff_time > NOW() AND aircraft.tail_number = ?)  AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) > 17;", [req.body.flight])
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
        db.raw("SELECT aircraft.model, SUM(ticket.paid) AS Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 GROUP BY aircraft.model ORDER BY aircraft.aircraft_id;",).then((result) => {
            return res.json({success: true, data: result[0]});
        })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            })

    } else {
        db.raw("SELECT aircraft.model, SUM(ticket.paid) as Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 AND aircraft.model = ?", [req.body.aircraft_id],).then((result) => {
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
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code;", [req.body.Enddate, req.body.Startdate])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false})
            })
        } else if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code;", [req.body.Startdate],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ?) AND ticket.is_boarded = 1 GROUP BY airport.code;", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE ticket.is_boarded = 1 GROUP BY airport.code;",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        }
    } else {
        if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1;", [req.body.Enddate, req.body.Startdate, req.body.Destination],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1;", [req.body.Startdate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ?) AND airport.code = ? AND ticket.is_boarded = 1;", [req.body.Enddate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM flight INNER JOIN route USING(route_id) INNER JOIN airport ON route.destination = airport.airport_id INNER JOIN booking USING(flight_id) INNER JOIN ticket USING(ticket_id) WHERE airport.code = ? AND ticket.is_boarded = 1;", [req.body.Destination]).then((result) => {
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
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount LEFT JOIN user ON discount.type = user.discount_type LEFT JOIN ticket USING(user_id) LEFT JOIN booking USING(ticket_id) WHERE NOT (ticket.date < ?) GROUP BY type;", [req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount LEFT JOIN user ON discount.type = user.discount_type LEFT JOIN ticket USING(user_id) LEFT JOIN booking USING(ticket_id) WHERE NOT (ticket.date > ?)  GROUP BY type;", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount LEFT JOIN user ON discount.type = user.discount_type LEFT JOIN ticket USING(user_id) LEFT JOIN booking USING(ticket_id) WHERE NOT (ticket.date > ? OR ticket.date < ?) GROUP BY type;", [req.body.Enddate, req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate === "" && req.body.Startdate === "") {
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount LEFT JOIN user ON discount.type = user.discount_type LEFT JOIN ticket USING(user_id) LEFT JOIN booking USING(ticket_id) GROUP BY type;",).then((result) => {
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
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE takeoff_time < now() AND ticket.is_boarded = 1 GROUP BY flight_id;",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Origin === "") {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a2.code= ? AND takeoff_time < now() AND ticket.is_boarded = 1 GROUP BY flight_id;", [req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Destination === "") {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a1.code= ? AND takeoff_time < now() AND ticket.is_boarded = 1 GROUP BY flight_id;", [req.body.Origin.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT flight_id, tail_number, model, a1.name as origin, a2.name as destination, takeoff_time, departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft USING(aircraft_id) LEFT JOIN route USING(route_id) LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE a1.code= ? AND a2.code= ? AND takeoff_time < now() AND ticket.is_boarded = 1 GROUP BY flight_id;", [req.body.Origin.trim(), req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    }
});
module.exports = router;