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



router.get('/model', function (req, res){
    db.raw("SELECT distinct model from aircraft WHERE is_active = 1")
    .then((data) => {
        // console.log(data);
        // console.log(data[0]);
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
    let {economy, business, platinum, tail} = req.body.state;
    let {model} = req.body.value;
    // console.log(req.body.value);
    // console.log(req.body);
    console.log(model);
    console.log(economy);
    console.log(business);
    console.log(platinum);
    console.log(tail);



    db.raw(`SELECT count(*) as num from aircraft where model ='${model}' and tail_number='${tail}'and is_active=0 ;`).then((data) => {
        console.log(data[0][0].num);
        if (data[0][0].num == 1) {
            db.raw(`UPDATE aircraft SET is_active=1 , Economy_seats = ? , Business_seats = ? , Platinum_seats = ? where model ='${model}' and tail_number='${tail}' `, [parseInt(economy), parseInt(business), parseInt(platinum)])
                .then(() => {
                    return res.json({ success: true  });
                })
                .catch((err) => {
                    console.error(err);
                    return res.json({ success: false });
                })
        }else{
            db.raw('INSERT INTO aircraft (tail_number,model,Economy_seats,Business_seats,Platinum_seats) VALUES(?,?,?,?,?)', [tail,model,economy, business, platinum]
            ).then(() => {
                return res.json({success: true});
            }).catch((err) => {
                console.error(err);
                return res.json({success: false,
                duplicate : true
                });
            })
        }
    })
    // console.log(req.body.value.model);
    // console.log(request.body.state);

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