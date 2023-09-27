const path = require("path")
const db = require('../util/database')
const User = db.users

function isStringInvalid(string) {
    if (string == undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}

function createUser(req, res, next) {

    const {Name , Email, Password} = req.body;
    if (isStringInvalid(Name) || isStringInvalid(Email) || isStringInvalid(Password)) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }
    User.create({ Name, Email, Password }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = { createUser }