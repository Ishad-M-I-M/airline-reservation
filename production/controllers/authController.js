const bcrypt = require("bcrypt");
const express = require("express");
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
            return res.status(500).json({success: false});
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
});

module.exports = router;