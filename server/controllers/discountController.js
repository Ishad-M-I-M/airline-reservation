const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body.gold);
    let gold;
    let discount;

    if (req.body.gold != null) {
        gold = req.body.gold
    } else {
        gold = -1;
    }
    if (req.body.discount != null) {
        discount = req.body.discount
    } else {
        discount = -1;
    }
    db.raw('CALL UpdateDiscount(?,?)', [gold, discount])
        .then(()=>{
            return res.json({success: true});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({success: false});
        })

});


router.get('/', (req, res) => {
        db.raw(`select * from discount`)
            .then((data) => {
                return res.json({
                    success: true,
                    data: data[0],
                });
            })
            .catch((err)=>{
                console.error(err);
                return res.status(500).json({success: false});
            });
});

module.exports = router;