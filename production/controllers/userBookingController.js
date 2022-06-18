

app.post("/search-result", function(req, res) {
  // console.log(req.body)
  var flightDetails = null;
  const depText = req.body.depDate;
  const departingDate = depText.split("T")[0];

  const desText = req.body.retDate;
  const destinationDate = desText.split("T")[0];

  const departingAirportCode = req.body.depAirCode;
  const destinationAirportCode = req.body.desAirCode;

  db.query(
    `select r1_id from (select org,des,r1_id from (SELECT route_id as r1_id ,location as org FROM route inner join port_location on route.origin = port_location.id) as A inner join (SELECT route_id as r2_id ,location as des FROM route inner join port_location on route.destination = port_location.id) as B on A.r1_id = B.r2_id ) as C where C.org="${departingAirportCode}" and C.des="${destinationAirportCode}"`,
    function(err, result) {
      if (err) {
        res.json({ success: false });
      }

      if (result.length != 0) {
        var route_id = JSON.stringify(result[0]["r1_id"]);

        if (route_id != null) {
          db.query(
            `select * from flight where route_id='${route_id}' and DATE(takeoff_time)='${departingDate}'`,
            function(err, result) {
              if (err) {
                res.json({ success: false });
              }
              flightDetails = result;

              db.query(
                `select r2_id from (select org,des,r2_id from (SELECT route_id as r1_id ,location as org FROM route inner join port_location on route.origin = port_location.id) as A inner join (SELECT route_id as r2_id ,location as des FROM route inner join port_location on route.destination = port_location.id) as B on A.r1_id = B.r2_id ) as C where C.org="${destinationAirportCode}" and C.des="${departingAirportCode}"`,
                (err, result) => {
                  if (err) {
                    res.json({ success: false });
                  }
                  if (result.length != 0) {
                    var return_route_id = JSON.stringify(result[0]["r2_id"]);
                    if (return_route_id != null) {
                      db.query(
                        `select * from flight where route_id='${return_route_id}' and DATE(takeoff_time)='${destinationDate}'`,
                        (err, result) => {
                          if (err) {
                            res.json({ success: false });
                          } else {
                            console.log(destinationDate);
                            res.json({
                              success: true,
                              data: flightDetails,
                              return_data: result,
                            });
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          );
        }
      } else {
        res.json({ success: true, data: flightDetails });
      }
    }
  );
});

app.post("/flightCard", function(req, res) {
  const f_id = req.body.flight_id;
  const a_id = req.body.aircraft_id;
  let eco_booked_seats = [];
  let busi_booked_seats = [];
  let plat_booked_seats = [];
  let Economy_seats, Business_seats, Platinum_seats;

  const promise1 = new Promise((resolve, reject) => {
    db.query(
      `select seat_number from ticket where flight_id=${f_id} and class ='Economy';select seat_number from ticket where flight_id=${f_id} and class ='Business';select seat_number from ticket where flight_id=${f_id} and class ='Platinum';select Economy_seats,Business_seats,Platinum_seats from aircraft where aircraft_id=${a_id};`,
      function(err, result) {
        if (err) throw err;
        for (let i = 0; i < result[0].length; i++) {
          eco_booked_seats.push(Number(result[0][i]["seat_number"]));
        }
        for (let i = 0; i < result[1].length; i++) {
          busi_booked_seats.push(Number(result[1][i]["seat_number"]));
        }
        for (let i = 0; i < result[2].length; i++) {
          plat_booked_seats.push(Number(result[2][i]["seat_number"]));
        }
        Economy_seats = Number(result[3][0]["Economy_seats"]);
        Business_seats = Number(result[3][0]["Business_seats"]);
        Platinum_seats = Number(result[3][0]["Platinum_seats"]);

        resolve({
          eco_booked_seats,
          busi_booked_seats,
          plat_booked_seats,
          Economy_seats,
          Business_seats,
          Platinum_seats,
        });
      }
    );
  });

  promise1.then((value) => {
    res.json({
      seatData: { value },
    });
  });
});

app.get("/getAirports", (req, res) => {
  console.log("mm")
  db.query("SELECT code,name from airport", (err, result) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({
        success: true,
        data: result,
      });
    }
  });
});

app.post("/reserveBooking", (req, res) => {
  console.log(req.session.userID);
  console.log(req.body);
  db.query(
    "call book_ticket_proc(?,?,?,?,?,?,?,?)",
    [
      req.body.f_id,
      req.session.userID,
      req.body.passengerId,
      req.body.passengerName,
      req.body.passengerAdd,
      req.body.bDay,
      req.body.flight_class,
      req.body.seatNo,
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        res.json({ success: false });
      } else {
        res.json({
          success: true,
          data: result,
        });
      }
    }
  );
});

app.post("/confirmBooking", (req, res) => {
  db.query(
    `update ticket set status=1 where flight_id=${req.body.f_id} and seat_number=${req.body.seatNo}`,
    (err, result) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({
          success: true,
          data: result,
        });
      }
    }
  );
});

app.post("/checkValidBooking", (req, res) => {
  console.log(req.body);

  db.query(
    `SELECT ticket_id from ticket where flight_id=${req.body.f_id} and passenger_id='${req.body.passengerId}' and status=1`,
    (err, result) => {
      if (err) {
        res.json({ success: false });
      } else {
        db.query(
          `SELECT seat_number from ticket where flight_id=${req.body.f_id} and seat_number=${req.body.seatNo}`,
          (err2, result2) => {
            if (err2) {
              res.json({ success: false });
            } else {
              if (result2.length !== 0) {
                res.json({
                  success: true,
                  data: "seat_occupied",
                });
              } else {
                if (result.length !== 0) {
                  res.json({
                    success: true,
                    data: "passenger_occupied",
                  });
                } else {
                  res.json({
                    success: true,
                    data: "available",
                  });
                }
              }
            }
          }
        );
      }
    }
  );
});

app.get("/isReserved", (req, res) => {
  db.query(
    `select ticket_id from ticket where flight_id=${req.query.f_id} and seat_number=${req.query.seatNo} and status=0;`,
    (err, result) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({
          success: true,
          data: result,
        });
      }
    }
  );
});

app.delete("/releaseBooking", (req, res) => {
  db.beginTransaction(function(err) {
    if (err) throw err;
    db.query(
      `delete from  ticket where flight_id=${req.body.f_id} and seat_number=${req.body.seatNo} and status=0`,
      function(err, result) {
        if (err) {
          db.rollback(() => {
            console.log(err);

            res.json({ success: false });
          });
        }
        db.query(
          `delete from passenger where passenger_id='${req.body.passengerId}' and passenger_id not in (select passenger_id from ticket)`,
          function(err, result) {
            if (err) {
              console.log(err);
              db.rollback(() => {
                res.json({ success: false });
              });
            }
            db.commit(function(err) {
              if (err) {
                db.rollback(() => {
                  console.log(err);

                  res.json({ success: false });
                });
              }
              res.json({
                success: true,
              });
            });
          }
        );
      }
    );
  });

  // db.query(
  //   `delete from  ticket where flight_id=${req.body.f_id} and seat_number=${req.body.seatNo} and status=0`,
  //   (err, result) => {
  //     if (err) {
  //       res.json({ success: false });
  //     } else {
  //       res.json({
  //         success: true,
  //         data: result,
  //       });
  //     }
  //   }
  // );
});

app.get("/getTickets", (req, res) => {
  db.query(
    `select * from ticket where user_id=${req.session.userID} and status=1;`,
    (err, result) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({
          success: true,
          data: result,
        });
      }
    }
  );
});

app.delete("/cancelTicket", (req, res) => {
  db.query(
    `update ticket set status=-1 where ticket_id=${req.body.ticketID}`,
    (err, result) => {
      if (err) {
        res.json({ success: false });
      } else {
        res.json({
          success: true,
          data: result,
        });
      }
    }
  );
});

