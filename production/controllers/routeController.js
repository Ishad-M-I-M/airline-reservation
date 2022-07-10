const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res)=>{
    db.raw(
        `select route_id as id, origin, destination from (select route_id,code as origin from route inner join airport on origin=airport_id where route.is_active = 1) as origin natural join (select route_id,code as destination from route inner join airport on destination=airport_id where route.is_active = 1) as destination; `,
    ).then((data)=>{
        return res.json({
            success: true,
            data: data[0],
          });
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send({success: false});
    })
          
});

router.post('/', (req, res) =>{
    console.log(req.body);
    db.raw(`select count(*) as num from route where origin = ${req.body.origin} and destination = ${req.body.destination}`).then((data) => {
        // console.log(data);
        console.log(data[0][0].num);
        if (data[0][0].num == 0) {
            db.raw(`INSERT INTO route(origin, destination) VALUES (?, ?)`, [req.body.origin, req.body.destination])
                .then(() => {
                    return res.json({ success: true ,message: false });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ success: false });
                })
        }else{
            return res.json({ message: true });
        }
    })
    // db.raw(`INSERT INTO route(origin, destination) VALUES (?, ?)`, [req.body.origin, req.body.destination])
    //     .then(()=>{
    //         return res.json({success: true});
    //     })
    //     .catch((err)=>{
    //         console.error(err);
    //         return res.status(500).json({success: false});
    //     })
})

router.delete('/:id', (req, res)=>{
    db.raw(`UPDATE route SET is_active = 0 WHERE route_id=? `, [req.params.id])
    .then(()=>{
        return res.send({success: true});
    })
    .catch(()=>{
        res.status(500).send({success: false});
    })
});

module.exports = router;
