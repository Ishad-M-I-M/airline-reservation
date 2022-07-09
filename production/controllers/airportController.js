const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', function (req, res){
    db.raw(`select * from airport_locations WHERE is_active = 1`)
    .then((results) => {

        return res.send({success: true, airports: results[0]});
    })
    .catch((err) => {
        console.log(err)
        return res.status(404).send({'sucess': false});
    });
});

router.post('/', function (req, res){
    const location = req.body.location.map(({location})=> location);
    db.raw(`call add_airport(?, ?, ?, ?)`, [req.body.code, req.body.name, location.join(','), location.length ])
    .then((results) => { return res.send({success: true})})
    .catch((err) => { 
        console.log(err);
        return res.status(404).send({success: false});
    })
});

router.delete('/:id', function (req, res){
    db.raw(`UPDATE airport SET is_active=0 WHERE airport_id=? `,[req.params.id])
    .then(() => {
        return  res.json({ success:true });
    })
    .catch(()=>{
        return res.status(500).json({success:false});
    });

});

module.exports = router;