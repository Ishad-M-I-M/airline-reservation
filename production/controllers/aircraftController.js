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
        return res.status(500).send({success: false});
    })
});

router.post('/', function (req, res){

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