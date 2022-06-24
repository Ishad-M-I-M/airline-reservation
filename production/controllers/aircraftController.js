const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', function (req, res){
    db.raw("SELECT * from aircraft")
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
    db.raw(`DELETE FROM aircraft WHERE aircraft_id=? `,[req.params.id])
    .then(() => {
        return res.send({success: true});
    })
    .catch(()=>{
        return res.status(500).send({success: false});
    })

});

module.exports = router;