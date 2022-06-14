const bcrypt = require("bcrypt");
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
//Database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

db.connect(function (err) {
  if (err) {
    console.log("DB error");
    throw err;
  }
});

const app = express.Router();

app.post("/login", (req, res) => {
  // console.log("Request to login");
  let email = req.body.email;
  let password = req.body.password;
  email = email.toLowerCase().trim();

  if (email.length > 50 || password.length > 50) {
    res.json({
      success: false,
      msg: "Not an authorized request",
    });
    return;
  }

  let cols = [email];
  db.query(
    "SELECT * FROM user WHERE email = ? LIMIT 1",
    cols,
    (err, data, fields) => {
      if (err) {
        res.json({
          success: false,
          msg: "Error occured while querying the data",
        });
        return;
      }

      //Found a user
      if (data && data.length === 1) {
        bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
          if (verified) {
            req.session.userID = data[0].user_id;
            res.json({
              success: true,
              email: data[0].email,
              role: data[0].role,
            });
            // console.log(`Successfully sending back ${data[0].email}`);
            return;
          } else {
            res.json({
              success: false,
              msg: "Invalid password",
            });
          }
        });
      } else {
        res.json({
          success: false,
          msg: "User not found",
        });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  if (req.session.userID) {
    req.session.destroy();
    res.json({
      success: true,
    });

    return true;
  } else {
    res.json({
      success: false,
    });

    return false;
  }
});

app.post("/isLoggedIn", (req, res) => {
  if (req.session.userID) {
    let cols = [req.session.userID];
    db.query(
      "SELECT * FROM user WHERE user_id = ? LIMIT 1",
      cols,
      (err, data, fields) => {
        if (data && data.length === 1) {
          res.json({
            success: true,
            email: data[0].email,
            role: data[0].role,
          });

          return true;
        } else {
          res.json({
            success: false,
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
    });
  }
});

app.post("/addFlight", (req, res) => {
  if (req.session.userID) {
    let aircraft_id = req.body.aircraft_id;
    let route_id = req.body.route_id;
    let takeoff_time = req.body.takeoff_time;
    let landing_time = req.body.landing_time;
    db.query(
      "INSERT INTO flight (aircraft_id, route_id, takeoff_time, departure_time) VALUES (?, ?, ?, ?)",
      [aircraft_id, route_id, takeoff_time, landing_time],
      (err, fields) => {
        if (err) {
          res.json({
            success: false,
            msg: "Insertion Failed, Try again",
          });
        } else {
          res.json({
            success: true,
            msg: "Insertion Success",
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      msg: "Login to the System",
    });
  }
});

app.post("/airportCodes", (req, res) => {
  if (req.session.userID) {
    db.query("SELECT code from airport", (err, data, fields) => {
      if (err) {
        res.json({
          success: false,
        });
      } else {
        res.json({
          success: true,
          codes: data,
        });
      }
    });
  } else {
    res.json({
      success: false,
    });
  }
});

app.post("/fetchFlight/clerk", (req, res) => {
  if (req.session.userID) {
    if (
      req.body.flight_id !== "" &&
      req.body.aircraft_id === "" &&
      req.body.origin === "" &&
      req.body.destination === ""
    ) {
      if (req.body.past === true) {
        if (req.body.future === true) {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where flight_id=?",
            [req.body.flight_id],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time < now() and flight_id=?",
            [req.body.flight_id],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        }
      } else {
        if (req.body.future === true) {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() and flight_id=?",
            [req.body.flight_id],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          res.json({
            success: false,
          });
          return false;
        }
      }
    } else if (
      req.body.aircraft_id !== "" &&
      req.body.flight_id === "" &&
      req.body.origin === "" &&
      req.body.destination === ""
    ) {
      if (req.body.past === true) {
        if (req.body.future === true) {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =?",
            [req.body.aircraft_id],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =? and takeoff_time < now()"[
              req.body.aircraft_id
            ],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        }
      } else {
        if (req.body.future === true) {
          db.query(
            "select flight_id, takeoff_time, departure_time, model, airport1.code as origin, airport2.code as destination from flight left join aircraft using(aircraft_id) left join route using(route_id) left join airport as airport1 on airport1.airport_id = route.origin left join airport as airport2 on airport2.airport_id=route.destination where aircraft_id =? and takeoff_time > now()",
            [req.body.aircraft_id],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          res.json({
            success: false,
          });
          return false;
        }
      }
    } else if (
      req.body.origin !== "" &&
      req.body.destination !== "" &&
      req.body.flight_id === "" &&
      req.body.aircraft_id === ""
    ) {
      if (req.body.past === true) {
        if (req.body.future === true) {
          db.query(
            "select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=?",
            [req.body.origin.trim(), req.body.destination.trim()],
            (err, data, fields) => {
              console.log("READ");

              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          db.query(
            "select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=? and takeoff_time < now()",
            [req.body.origin.trim(), req.body.destination.trim()],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        }
      } else {
        if (req.body.future === true) {
          db.query(
            "select flight_id, model, p1.location as origin, p2.location as destination, flight.takeoff_time, flight.departure_time from flight left join aircraft on flight.aircraft_id=aircraft.aircraft_id left join route on route.route_id=flight.route_id left join airport as airport1 on airport1.airport_id=route.origin left join port_location as p1 on p1.id=route.origin left join port_location as p2 on p2.id=route.destination having origin=? and destination=? and takeoff_time > now()",
            [req.body.origin.trim(), req.body.destination.trim()],
            (err, data, fields) => {
              if (err) {
                res.json({
                  success: false,
                });
                return false;
              } else {
                res.json({
                  success: true,
                  data: data,
                });
                return true;
              }
            }
          );
        } else {
          res.json({
            success: false,
          });
          return false;
        }
      }
    } else {
      res.json({
        success: false,
      });
      return false;
    }
  }
});

app.post("/bookingFlights", (req, res) => {
  if (req.session.userID) {
    db.query(
      "select flight_id, takeoff_time, departure_time, model, total_seats, Economy_seats, Business_seats, Platinum_seats, airport1.code as origin, airport2.code as destination from flight inner join aircraft using(aircraft_id) inner join route using (route_id) inner join airport as airport1 on airport1.airport_id=route.origin inner join airport as airport2 on airport2.airport_id=route.destination where takeoff_time > now() order by takeoff_time",
      (err, data, fields) => {
        if (err) {
          res.json({
            success: false,
          });
        } else {
          res.json({
            success: true,
            data: data,
          });
        }
      }
    );
  } else {
    req.json({
      success: false,
    });
  }
});

app.post("/loadSeatnumber", (req, res) => {
  if (req.session.userID) {
    let flight_id = parseInt(req.body.flight_id);
    let seat_inclass = req.body.class;
    let stmt = "";
    if (seat_inclass == "Economy") {
      stmt = "SELECT get_Economy_seats(?)";
    } else if (seat_inclass == "Business") {
      stmt = "SELECT get_Business_seats(?)";
    } else {
      stmt = "SELECT get_Platinum_seats(?)";
    }

    db.query(stmt, [flight_id], (err, data, fields) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
        });
      } else {
        res.json({
          success: true,
          seat_number: data[0],
        });
      }
    });
  }
});

app.post("/bookTicket", (req, res) => {
  if (req.session.userID) {
    db.query(
      "SELECT cost FROM flight LEFT JOIN flight_cost USING(flight_id) WHERE flight_id=? AND class=?",
      [req.body.flight_id, req.body.class],
      (err, data1, fields) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.json({
            success: false,
            msg: "Error Fetching the Cost of the Flight",
          });
          return;
        } else {
          db.query(
            "CALL book_ticket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              req.body.passenger_id,
              req.body.passenger_name,
              req.body.date,
              req.body.passenger_address,
              req.session.userID,
              req.body.flight_id,
              req.body.seat_number,
              req.body.date,
              req.body.class,
              data1[0].cost,
            ],
            (err, fields) => {
              if (err) {
                res.status(500);
                res.json({
                  success: false,
                  msg: "Error Booking the Ticket",
                });
                return;
              } else {
                res.json({
                  success: true,
                  msg: "Booking Successful",
                });
                return;
              }
            }
          );
        }
      }
    );
  }
});

app.get("/location", (req, res) => {
  db.query("SELECT * from port_location_with_parent", (err, data) => {
    if (err) {
      res.status(500);
      res.json({ success: false });
    } else {
      res.json({
        success: true,
        locations: data,
      });
    }
  });
});

app.post("/loadPassengerDetailsReport", (req, res) => {
  if (req.session.userID) {
    if (req.body.below === true) {
      if (req.body.above === true) {
        db.query(
          "SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT (f1.takeoff_time > f2.takeoff_time) AND aircraft.tail_number = ?",
          [req.body.flight],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else {
        db.query(
          "SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) < 18 AND aircraft.tail_number = ?",
          [req.body.flight],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      }
    } else {
      if (req.body.above === true) {
        db.query(
          "SELECT passenger.passenger_id, passenger.name, TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) AS Age, passenger.address FROM passenger INNER JOIN booking ON passenger.passenger_id = booking.passenger_id INNER JOIN ticket ON booking.ticket_id = ticket.ticket_id INNER JOIN seat_reservation ON ticket.ticket_id = seat_reservation.ticket_id LEFT JOIN flight AS f1 ON seat_reservation.flight_id = f1.flight_id LEFT JOIN flight AS f2 ON seat_reservation.flight_id = f2.flight_id INNER JOIN aircraft ON f1.aircraft_id = aircraft.aircraft_id WHERE f1.takeoff_time > NOW() AND NOT(f1.takeoff_time > f2.takeoff_time) AND TIMESTAMPDIFF(YEAR, passenger.dob, CURDATE()) > 17 AND aircraft.tail_number = ?",
          [req.body.flight],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else {
        res.json({
          success: false,
        });
        return false;
      }
    }
  }
});

app.post("/loadTotalRevenueReport", (req, res) => {
  if (req.session.userID) {
    if (req.body.aircraft_id === "") {
      db.query(
        "SELECT aircraft.model, SUM(ticket.paid) AS Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 GROUP BY aircraft.model ORDER BY aircraft.aircraft_id;",
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else {
      db.query(
        "SELECT aircraft.model, SUM(ticket.paid) as Total_Revenue FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN aircraft USING(aircraft_id) WHERE flight.takeoff_time < NOW() AND is_boarded = 1 AND aircraft.model = ?",
        [req.body.aircraft_id],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    }
  }
});

app.post("/loadPassengerCountReport", (req, res) => {
  if (req.session.userID) {
    if (req.body.Destination === "") {
      if (req.body.Enddate !== "" && req.body.Startdate !== "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code;",
          [req.body.Enddate, req.body.Startdate],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else if (req.body.Enddate == "" && req.body.Startdate !== "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time < ?) AND ticket.is_boarded = 1 GROUP BY airport.code",
          [req.body.Startdate],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE NOT (flight.takeoff_time > ?) AND ticket.is_boarded = 1 GROUP BY airport.code",
          [req.body.Enddate],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM airport INNER JOIN route ON airport.airport_id = route.destination INNER JOIN flight ON route.route_id = flight.route_id INNER JOIN booking ON flight.flight_id = booking.flight_id INNER JOIN ticket USING(ticket_id) WHERE ticket.is_boarded = 1 GROUP BY airport.code",
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      }
    } else {
      if (req.body.Enddate !== "" && req.body.Startdate !== "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1",
          [req.body.Enddate, req.body.Startdate, req.body.Destination],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else if (req.body.Enddate == "" && req.body.Startdate !== "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time < ?) AND airport.code = ? AND ticket.is_boarded = 1",
          [req.body.Startdate, req.body.Destination],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE NOT (flight.takeoff_time > ?) AND airport.code = ? AND ticket.is_boarded = 1",
          [req.body.Enddate, req.body.Destination],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      } else {
        db.query(
          "SELECT airport.code, airport.name, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) INNER JOIN route ON flight.route_id = route.route_id INNER JOIN airport ON airport.airport_id = route.destination WHERE airport.code = ? AND ticket.is_boarded = 1",
          [req.body.Destination],
          (err, data, fields) => {
            if (err) {
              res.json({
                success: false,
              });
              return false;
            } else {
              res.json({
                success: true,
                data: data,
              });
              return true;
            }
          }
        );
      }
    }
  }
});

app.post("/loadBookingReport", (req, res) => {
  if (req.session.userID) {
    if (req.body.Enddate == "" && req.body.Startdate !== "") {
      db.query(
        "SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type",
        [req.body.Startdate],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              entry: true,
            });
            return false;
          } else {
            res.json({
              success: true,
              entry: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else if (req.body.Enddate !== "" && req.body.Startdate == "") {
      db.query(
        "SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type",
        [req.body.Enddate],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              entry: true,
            });
            return false;
          } else {
            res.json({
              success: true,
              entry: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else if (req.body.Enddate !== "" && req.body.Startdate !== "") {
      db.query(
        "SELECT discount.type, COUNT(ticket.user_id) AS Booking_Count FROM discount INNER JOIN user INNER JOIN ticket ON user.user_id = ticket.user_id INNER JOIN booking USING(ticket_id) INNER JOIN flight USING(flight_id) WHERE NOT (flight.takeoff_time > ? OR flight.takeoff_time < ?) AND (discount.type = user.discount_type) GROUP BY user.discount_type",
        [req.body.Enddate, req.body.Startdate],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              entry: true,
            });
            return false;
          } else {
            res.json({
              success: true,
              entry: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else if (req.body.Enddate == "" && req.body.Startdate == "") {
      res.json({
        success: false,
        entry: false,
      });
      return false;
    }
  }
});

app.post("/loadPastFlightDetailsReport", (req, res) => {
  if (req.session.userID) {
    if (req.body.Origin === "" && req.body.Destination === "") {
      db.query(
        "SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING takeoff_time < now();",
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else if (req.body.Origin === "") {
      db.query(
        "SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a2.code= ? AND takeoff_time < now();",
        [req.body.Destination.trim()],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else if (req.body.Destination === "") {
      db.query(
        "SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND takeoff_time < now();",
        [req.body.Origin.trim()],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    } else {
      db.query(
        "SELECT flight_id, model, a1.code AS origin_code, a1.name as origin, a2.code AS destination_code, a2.name as destination, flight.takeoff_time, flight.departure_time, COUNT(ticket.is_boarded) AS Passenger_Count FROM ticket INNER JOIN seat_reservation USING(ticket_id) INNER JOIN flight USING(flight_id) LEFT JOIN aircraft ON flight.aircraft_id=aircraft.aircraft_id LEFT JOIN route ON route.route_id=flight.route_id LEFT JOIN airport AS a1 ON a1.airport_id=route.origin LEFT JOIN airport AS a2 ON a2.airport_id=route.destination WHERE ticket.is_boarded = 1 GROUP BY flight_id HAVING a1.code= ? AND a2.code= ? AND takeoff_time < now();",
        [req.body.Origin.trim(), req.body.Destination.trim()],
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
            });
            return false;
          } else {
            res.json({
              success: true,
              data: data,
            });
            return true;
          }
        }
      );
    }
  }
});


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


module.exports = app;
