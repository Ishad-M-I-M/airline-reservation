const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res)=>{
    db.raw(
        `select route_id as id, origin, destination from (select route_id,code as origin from route inner join airport on origin=airport_id) as origin natural join (select route_id,code as destination from route inner join airport on destination=airport_id) as destination; `,
    ).then((data)=>{
        return res.json({
            success: true,
            data: data[0],
          });
    })
    .catch((err)=>{
        res.status(500).send({success: false});
    })
          
});

router.post('/', (req, res) =>{
    console.log(req.body);
    db.raw(`INSERT INTO route(origin, destination) VALUES (?, ?)`, [req.body.origin, req.body.destination])
        .then(()=>{
            return res.json({success: true});
        })
        .catch((err)=>{
            console.error(err);
            return res.status(500).json({success: false});
        })
})

router.delete('/:id', (req, res)=>{
    db.raw(`DELETE FROM route WHERE route_id=? `, [req.params.id])
    .then(()=>{
        return res.send({success: true});
    })
    .catch(()=>{
        res.status(500).send({success: false});
    })
});

module.exports = router;
