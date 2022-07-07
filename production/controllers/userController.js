const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res)=>{
    db.raw(
        `select * from users_view; `,
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

router.patch('/:id', (req, res)=>{
    const id = req.params.id;
    const {role, discount_type} = req.body;
    db.raw(
        `update user set role = '${role}', discount_type = '${discount_type}' where user_id = ${id}; `,
    ).then((data)=>{
        console.log(data);
        return res.json({
            success: true,
        });
    }).catch((err)=>{
        return res.status(500).send({success: false});
    })
})

router.delete('/:id', (req, res)=>{
    db.raw(`UPDATE user SET is_active=0 where user_id = ?`, [req.params.id])
        .then(()=>{
            return res.send({success: true});
        })
        .catch(()=>{
            res.status(500).send({success: false});
        })
});

module.exports = router;
