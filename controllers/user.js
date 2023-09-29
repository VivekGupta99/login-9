const path = require("path")
const db = require('../util/database')
const bcrypt = require('bcrypt');
const User = db.users

function isStringInvalid(string) {
    if (string == undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}

function createUser(req, res, next) {

    const { Name, Email, Password } = req.body;
    if (isStringInvalid(Name) || isStringInvalid(Email) || isStringInvalid(Password)) {
        return res.status(400).send({
            message: "Bad Data"
        })
    }

    User.findOne({ where: { Email } }).then(existingUser => {
        if (existingUser) {
            return res.status(409).send({
                message: "Customer already exists"
            });
        }
    })

    bcrypt.hash(Password, 10, (err, hash) => {
        console.log(err);
        User.create({ Name, Email, Password: hash }).then((data) => {
            res.status(200).send(data)
        }).catch((error) => {
            res.status(500).send(error);
        })
    })
    // User.create({ Name, Email, Password }).then((data) => {
    //     res.status(200).send(data)
    // }).catch((err) => {
    //     res.status(500).send(err);
    // })
}

async function loginUser(req, res) {
    try {
        const { Email, Password } = req.body;

        if (isStringInvalid(Email) || isStringInvalid(Password)) {
            return res.status(400).json({ success: false, message: "emailid or password is missing" })
        }

        const users = await User.findAll({ where: { Email } });
        if (users.length > 0) {
            const user = users[0]; // Get the first user found
            bcrypt.compare(Password, user.Password, (err, response) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "something went wrong" });
                }
                //if passwords matched
                if (response == true) {
                    // return res.redirect('/exp')
                    return res.status(200).json({ success: true, message: "user logged-in successfully" });
                    
                } else {
                    return res.status(400).json({ success: false, message: "password is incorrect" });
                }
            })
        }
        else {
            return res.status(404).json({ success: false, message: "User doesn't exist" });
        }
    } catch (error) {
        console.log(error)
        res.status(501).json({ success: false, message: error })
    }
}

module.exports = { createUser, loginUser }