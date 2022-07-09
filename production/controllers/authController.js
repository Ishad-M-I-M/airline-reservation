const bcrypt = require("bcrypt");
const express = require("express");
const { data } = require("jquery");
const db = require("../db");
const router = express.Router();
router.post("/login", (req, res) => {
    // console.log("Request to login");
    let email = req.body.email;
    let password = req.body.password;
    email = email.toLowerCase().trim();

    if (email.length > 50 || password.length > 50) {
        res.json({
            success: false, msg: "Not an authorized request",
        });
        return;
    }

    let cols = [email];
    db.raw("SELECT * FROM user WHERE email = ? LIMIT 1", cols)
        .then((data) => {
            //Found a user
            if (data[0] && data[0].length === 1) {
                bcrypt.compare(password, data[0][0].password, (bcryptErr, verified) => {
                    if (verified) {
                        req.session.userID = data[0][0].user_id;
                        return res.json({
                            success: true, email: data[0][0].email, role: data[0][0].role,
                        });
                        // console.log(`Successfully sending back ${data[0].email}`);

                    } else {
                        return res.json({
                            success: false, msg: "Invalid password",
                        });
                    }
                });
            } else {
                return res.json({
                    success: false, msg: "User not found",
                });
            }
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ success: false });
        })
});

router.post("/logout", (req, res) => {
    if (req.session.userID) {
        req.session.destroy();
        res.json({
            success: true,
        });
        return true;
    } else {
        res.json({
            success: false,
        });
        return false;
    }
});

router.post("/isLoggedIn", (req, res) => {
        if (req.session.userID) {
            let cols = [req.session.userID];
            db.raw("SELECT * FROM user WHERE user_id = ? LIMIT 1", cols)
                .then((data) => {
                    if (data[0] && data[0].length === 1) {
                        return res.json({
                            success: true, email: data[0][0].email, role: data[0][0].role,
                        });
                    } else {
                        return res.json({
                            success: false,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({success: false});
                });
        } else {
            return res.json({
                success: false,
            });
        }
});


router.post('/adduser', (req, res) => {

    let date = req.body.date;
    let dob = date.split("T")[0];
    let e = req.body.email;
    let pwd = req.body.password;
    let fn = req.body.fname;
    let ln = req.body.lname;
    let ln1 = ln === "" ? null : ln;


    let pswrd = bcrypt.hashSync(pwd, 10);

    console.log(req.body);
    console.log(pswrd);
    console.log(dob);
    console.log(ln1);

    db.raw(`SELECT count(*) as num from user where email='${e}';`).then((data) => {
        console.log(data[0][0].num);
        if (data[0][0].num == 0) {
            db.raw(`INSERT into user(email,password,first_name,last_name,role,is_active,dob) VALUES (?,?,?,?,?,?,?)`, [e, pswrd, fn, ln1, "user", 1, dob])
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
    // INSERT into user(email,password,first_name,role,is_active,dob) VALUES("one@gmail.com2","hash2","one2","user",1,'2022-11-12');


    // db.raw(`INSERT into user(email,password,first_name,last_name,role,is_active,dob) VALUES (?,?,?,?,?,?,?)`, [e,pswrd,fn,ln1,"user",1,dob])
    //     .then(()=>{
    //         return res.json({success: true});
    //     })
    //     .catch((err)=>{
    //         console.error(err);
    //         return res.status(500).json({success: false});
    //     })

    // db.raw(`SELECT addUser(?,?)`, [e, pswrd])
    //     .then((data) => {
    //         console.log(data[0])
    //         return res.send({
    //             success: true,
    //             data: data[0]
    //         });
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         return res.status(500).json({ success: false });
    //     })
});


module.exports = router;