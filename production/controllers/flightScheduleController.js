const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', function (req, res){
    db.raw(
        "SELECT flight.flight_id as id, tail_number, model, a.code AS origin, b.code AS destination, DATE_FORMAT(takeoff_time, '%Y-%m-%d %l:%i %p') as takeoff_time , DATE_FORMAT(departure_time, '%Y-%m-%d %l:%i %p') as departure_time FROM flight INNER JOIN aircraft USING(aircraft_id) INNER JOIN route USING(route_id) INNER JOIN airport AS a ON a.airport_id = route.origin INNER JOIN airport AS b ON b.airport_id = route.destination WHERE flight.is_active = 1 AND takeoff_time > now() ORDER BY flight_id;"
    )
    .then((data) => {
        return res.send({
            success: true,
            data: data[0]
          });
    })
    .catch((err) => {
        return res.status(500).send({success: false})
    })
});

router.post('/', function (req, res){
    let {aircraft_id, route_id, takeoff_time, landing_time, business_cost, economy_cost, platinum_cost} = req.body;

    db.raw("CALL schedule_flight(?, ?, ?, ?, ?, ?, ?)",
            [aircraft_id, route_id, takeoff_time, landing_time, business_cost, economy_cost, platinum_cost],
    ).then(() => {
        return res.json({success: true});
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({success: false});
    });

});

router.delete('/:id', function (req, res){
    db.raw(`UPDATE flight SET flight.is_active = 0 WHERE flight.flight_id =? `,[req.params.id])
    .then(()=>{
        return res.send({success: true});
    })
    .catch(()=>{
        return res.status(500).send({success: false})
    })

});

module.exports = router;