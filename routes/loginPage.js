const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const dbCollectionNames = require('../enums/db_collection_names');

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
                return obj.findOne({ "login": login, "password": password });
            };
            const user = await sendReqToDatabase(dbCollectionNames.users, getUser);
            if (!user) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "User not found",
                });
            } else {
                res.status(200).json({
                    message: "Login successful",
                    user,
                });
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            });
        }
    }
);

module.exports = router;