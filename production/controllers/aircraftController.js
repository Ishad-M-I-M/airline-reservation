const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', function (req, res){
    db.raw("SELECT * from aircraft WHERE is_active = 1")
    .then((data) => {
        return res.send({
            success: true,
            aircrafts: data[0],
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send({success: false});
    })
});

router.post('/', function (req, res){
    let {model, economy, business, platinum, tail_number} = req.body;

    console.log(`${model}`);
    db.raw('INSERT INTO aircraft (tail_number,model,Economy_seats,Business_seats,Platinum_seats) VALUES(?,?,?,?,?)', [tail_number,model,economy, business, platinum]
    ).then(() => {
        return res.json({success: true});
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({success: false});
    })
});

router.delete('/:id', function (req, res){
    db.raw(`UPDATE aircraft SET is_active=0 WHERE aircraft_id=? `,[req.params.id])
    .then((data) => {
        console.log(data);
        return res.send({success: true});
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).send({success: false});
    })

});

module.exports = router;