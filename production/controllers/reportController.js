const express = require('express');
const db = require('../db');
const router = express.Router();

router.post("/passenger-details", (req, res) => {
    if (req.body.below === true) {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT (f1.takeoff_time > f2.takeoff_time) AND aircraft.tail_number = ?", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({success: false});
                });
        } else {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) < 18 AND aircraft.tail_number = ?", [req.body.flight])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    } else {
        if (req.body.above === true) {
            db.raw("SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) > 17 AND aircraft.tail_number = ?", [req.body.flight])
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
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code;", [req.body.Enddate, req.body.Startdate])
                .then((result) => {
                    return res.json({success: true, data: result[0]})
                }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false})
            })
        } else if (req.body.Enddate === "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code", [req.body.Startdate],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ?) AND ticket.is_boarded = 1 GROUP BY airport.code", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE ticket.is_boarded = 1 GROUP BY airport.code",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        }
    } else {
        if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1", [req.body.Enddate, req.body.Startdate, req.body.Destination],).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate == "" && req.body.Startdate !== "") {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1", [req.body.Startdate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate === "") {
            db.query("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ?) AND airport.code = ? AND ticket.is_boarded = 1", [req.body.Enddate, req.body.Destination]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE airport.code = ? AND ticket.is_boarded = 1", [req.body.Destination]).then((result) => {
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
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type", [req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
            db.raw("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type", [req.body.Enddate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate !== "" && req.body.Startdate !== "") {
            db.query("SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type", [req.body.Enddate, req.body.Startdate]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Enddate === "" && req.body.Startdate === "") {
            return res.status(400).json({success: false, msg: "bad request"});
        }
    }
});

router.post("/past-flight-details", (req, res) => {
    if (req.session.userID) {
        if (req.body.Origin === "" && req.body.Destination === "") {
            db.raw("SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING takeoff_time < now();",).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Origin === "") {
            db.raw("SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a2.code= ? AND takeoff_time < now();", [req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else if (req.body.Destination === "") {
            db.raw("SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND takeoff_time < now();", [req.body.Origin.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });

        } else {
            db.raw("SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND a2.code= ? AND takeoff_time < now();", [req.body.Origin.trim(), req.body.Destination.trim()]).then((result) => {
                return res.json({success: true, data: result[0]});
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({success: false});
            });
        }
    }
});
module.exports = router;