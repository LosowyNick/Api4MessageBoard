const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const dbCollectionNames = require('../enums/db_collection_names');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.post("/", jsonParser, 
    (req, res, next) => {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({
                message: "Login or password not present",
            })
        }else{
            next();
        }
    },
    async (req, res, next) => {
        try {
            const { login, password } = req.body;
            const getUser = function(obj){
                return obj.findOne({ "login": login });
            };
            const user = await sendReqToDatabase(dbCollectionNames.users, getUser);
            if (!user) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "User not found",
                });
            } else {
                bcrypt.compare(password, user.password).then(function (result) {
                    if(result){
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign(
                            { id: user._id },
                            jwtSecret,
                            { expiresIn: maxAge }
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000,
                        });
                        res.status(201).json({
                            message: "User successfully Logged in",
                            user: user._id,
                        });
                    }else{
                        res.status(400).json({ message: "Login not succesful" });
                    }
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "An error occurred"
            });
        }
    }
);

module.exports = router;