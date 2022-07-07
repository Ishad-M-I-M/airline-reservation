const express = require("express");
const db = require("../db");

const app = express.Router();

app.post("/fetchFlight/clerk", (req, res) => {
    let sql = "";
    let cols = [];
    if (req.body.flight_id !== "" && req.body.tail_number === "" && req.body.origin === "" && req.body.destination === "") {
        cols = [req.body.flight_id];
        if (req.body.past === true) {
            if (req.body.future === true) {
                sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where flight_id=?";
            } else {
                sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time < now() and flight_id=?";
            }
        } else if (req.body.future === true) {
            sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() and flight_id=?";
        } else {
            return res.status(400).json({ success: false })
        }
    } else if (req.body.tail_number !== "" && req.body.flight_id === "" && req.body.origin === "" && req.body.destination === "") {
        cols = [req.body.tail_number.trim()];
        if (req.body.past === true) {
            if (req.body.future === true) {
                sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where tail_number=?";
            } else {
                sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where tail_number = ? and takeoff_time < now()";
            }
        } else if (req.body.future === true) {
            sql = "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where tail_number =? and takeoff_time > now()";
        } else {
            return res.status(400).json({ success: false });
        }
    } else if (req.body.origin !== "" && req.body.destination !== "" && req.body.flight_id === "" && req.body.tail_number === "") {
        cols = [req.body.origin.trim(), req.body.destination.trim()];
        if (req.body.past === true) {
            if (req.body.future === true) {
                sql = "select flight_id, model, airport1.code as origin, airport2.code as destination, takeoff_time, departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route using(route_id) left join airport as airport1 on airport1.airport_id=route.origin left join airport as airport2 on airport2.airport_id=route.destination where airport1.code=? and airport2.code=?";
            } else {
                sql = "select flight_id, model, airport1.code as origin, airport2.code as destination, takeoff_time, departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route using(route_id) left join airport as airport1 on airport1.airport_id=route.origin left join airport as airport2 on airport2.airport_id=route.destination where airport1.code=? and airport2.code=? and takeoff_time < now()";
            }
        } else if (req.body.future === true) {
            sql = "select flight_id, model, airport1.code as origin, airport2.code as destination, takeoff_time, departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route using(route_id) left join airport as airport1 on airport1.airport_id=route.origin left join airport as airport2 on airport2.airport_id=route.destination where airport1.code=? and airport2.code=? and takeoff_time > now()";
        } else {
            return res.status(400).json({ success: false });
        }
    } else return res.status(400).json({ success: false });

    db.raw(sql, cols)
        .then((data) => {
            return res.status(200).json({ success: true, data: data[0] });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        })

});

app.post("/bookingFlights", (req, res) => {
    db.raw("select flight_id, takeoff_time, departure_time, model, Economy_seats, Business_seats, Platinum_seats, airport1.code as origin, airport2.code as destination from flight inner join aircraft using(aircraft_id) inner join route using (route_id) inner join airport as airport1 on airport1.airport_id=route.origin inner join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() order by takeoff_time",).then((data) => {
        return res.json({
            success: true, data: data[0],
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false });
    });
});

app.post("/loadSeatnumber", (req, res) => {

    let flight_id = parseInt(req.body.flight_id);
    let seat_inclass = req.body.class.trim();
    let stmt = "";
    if (seat_inclass === "Economy") {
        stmt = "SELECT get_Economy_seats(?)";
    } else if (seat_inclass === "Business") {
        stmt = "SELECT get_Business_seats(?)";
    } else {
        stmt = "SELECT get_Platinum_seats(?)";
    }

    db.raw(stmt, [flight_id])
        .then((data) => {
            return res.json({
                success: true, data: data[0],
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        });
});

app.post("/bookTicket", (req, res) => {
    db.raw("SELECT cost FROM flight LEFT JOIN flight_cost USING(flight_id) WHERE flight_id=? AND class=?", [req.body.flight_id, req.body.class]).then((data) => {
        if (data[0].length > 0) {
            db.raw("CALL book_ticket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.passenger_id, req.body.passenger_name, req.body.date, req.body.passenger_address, req.session.userID, req.body.flight_id, req.body.seat_number, req.body.date, req.body.class, data[0][0]['cost']]).then(() => {
                return res.json({
                    success: true, msg: "Booking Successful",
                });
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ success: false });
            });
        }
    })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        });
});

app.get("/location", (req, res) => {
    db.raw("SELECT * from port_location_with_parent")
        .then((data) => {
            return res.json({
                success: true, data: data[0],
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        });

});


app.post("/search-result", function (req, res) {
    // console.log(req.body)
    let flightDetails = null;
    const depText = req.body.depDate;
    const departingDate = depText.split("T")[0];

    const desText = req.body.retDate;
    const destinationDate = desText.split("T")[0];

    const departingAirportCode = req.body.depAirCode;
    const destinationAirportCode = req.body.desAirCode;

    db.raw(`select route_id as r1_id
            from route
            where destination = (select airport_id from airport where code = "${destinationAirportCode}")
              and origin = (select airport_id from airport where code = "${departingAirportCode}");
    `).then((data) => {
        if (data[0].length !== 0) {
            let route_id = JSON.stringify(data[0][0]["r1_id"]);

            if (route_id != null) {
                db.raw(`select *
                        from flight
                        where route_id = '${route_id}'
                          and DATE(takeoff_time) = '${departingDate}'`).then((data) => {
                    flightDetails = data[0];

                    db.raw(`select route_id as r2_id
                            from route
                            where origin = (select airport_id from airport where code = "${destinationAirportCode}")
                              and destination =
                                  (select airport_id from airport where code = "${departingAirportCode}");`)
                        .then((result) => {
                            if (result[0].length != 0) {
                                let return_route_id = JSON.stringify(result[0][0]["r2_id"]);
                                if (return_route_id != null) {
                                    db.raw(`select *
                                              from flight
                                              where route_id = '${return_route_id}'
                                                and DATE(takeoff_time) = '${destinationDate}'`)
                                        .then((data) => {

                                            return res.json({
                                                success: true, data: flightDetails, return_data: data[0],
                                            });
                                        }).catch((err) => {
                                            console.error(err);
                                            return res.status(500).json({ success: false });
                                        });

                                }
                            }
                        }).catch((err) => {
                            console.error(err);
                            return res.status(500).json({ success: false });
                        });
                }).catch((err) => {
                    console.error(err);
                    return res.status(500).json({ success: false });
                });
            }
        } else {
            res.json({ success: true, data: flightDetails });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false });
    });

});

app.post("/flightCard", function (req, res) {
    const f_id = req.body.flight_id;
    const a_id = req.body.aircraft_id;
    let eco_booked_seats = [];
    let busi_booked_seats = [];
    let plat_booked_seats = [];
    let Economy_seats, Business_seats, Platinum_seats;



    const promise1 = new Promise((resolve, reject) => {
        db.raw(
            `select seat_number
                from ticket
                where flight_id = ${f_id}
                  and class = 'Economy';
        select seat_number
        from ticket
        where flight_id = ${f_id}
          and class = 'Business';
        select seat_number
        from ticket
        where flight_id = ${f_id}
          and class = 'Platinum';
        select Economy_seats, Business_seats, Platinum_seats
        from aircraft
        where aircraft_id = ${a_id};`


        )
            .then((result) => {


                for (let i = 0; i < result[0][0].length; i++) {
                    eco_booked_seats.push(Number(result[0][0][i]["seat_number"]));
                }


                for (let i = 0; i < result[0][1].length; i++) {
                    busi_booked_seats.push(Number(result[0][1][i]["seat_number"]));
                }


                for (let i = 0; i < result[0][2].length; i++) {
                    plat_booked_seats.push(Number(result[0][2][i]["seat_number"]));
                }

                Economy_seats = Number(result[0][3][0]["Economy_seats"]);
                Business_seats = Number(result[0][3][0]["Business_seats"]);
                Platinum_seats = Number(result[0][3][0]["Platinum_seats"]);


                return res.json({
                    eco_booked_seats,
                    busi_booked_seats,
                    plat_booked_seats,
                    Economy_seats,
                    Business_seats,
                    Platinum_seats,
                });
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ success: false });
            })
    });

});

app.post("/reserveBooking", (req, res) => {

    let userId = req.session.userID ? req.session.userID : -1;


    db.raw("call book_ticket_proc(?,?,?,?,?,?,?,?)", [req.body.f_id, userId, req.body.passengerId, req.body.passengerName, req.body.passengerAdd, req.body.bDay, req.body.flight_class, req.body.seatNo,]).then((result) => {
        return res.json({
            success: true, data: result[0],
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false });
    });
});

app.post("/confirmBooking", (req, res) => {
    db.raw(`update ticket
            set status=1
            where flight_id = ${req.body.f_id}
              and seat_number = ${req.body.seatNo}`)
        .then((result) => {
            return res.json({
                success: true, data: result[0],
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        });

});

app.post("/checkValidBooking", (req, res) => {

    if (req.body.f_id)

        db.raw(`SELECT ticket_id
            from ticket
            where flight_id = ${req.body.f_id}
              and passenger_id = '${req.body.passengerId}'
              and status = 1`).then((result) => {
            db.raw(`SELECT seat_number
                from ticket
                where flight_id = ${req.body.f_id}
                  and seat_number = ${req.body.seatNo}`).then((result2) => {
                if (result2[0].length !== 0) {
                    res.json({
                        success: true, data: "seat_occupied",
                    });
                } else {
                    if (result[0].length !== 0) {
                        res.json({
                            success: true, data: "passenger_occupied",
                        });
                    } else {
                        res.json({
                            success: true, data: "available",
                        });
                    }
                }
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ success: false });
            });

        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        });
});

app.get("/isReserved", (req, res) => {


    db.raw(`select ticket_id
            from ticket
            where flight_id = ${req.query.f_id}
              and seat_number = ${req.query.seatNo}
              and status = 0;`).then((result) => {
        return res.json({
            success: true, data: result[0],
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false });
    });
});

app.delete("/releaseBooking", (req, res) => {


    db.raw("CALL release_booking(?, ?, ?)", [req.body.f_id, req.body.seatNo, req.body.passengerId]).then(() => {
        return res.json({
            success: true
        });
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({ success: false });
    });



});

app.get("/getTickets", (req, res) => {
    if (req.session.userID) {
        db.raw(`select *
            from ticket
            where user_id = ${req.session.userID}
              and status = 1;`)
            .then((result) => {
                return res.json({
                    success: true, data: result[0],
                });
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ success: false });
            });
    }
    else {
        return res.status(500).json({ success: false });

    }
});

module.exports = app;
