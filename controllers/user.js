const path = require("path")
const db = require('../util/database')
const User = db.users

function createUser(req, res, next) {
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }
    
    const obj = {
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    User.create(obj).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = { createUser }