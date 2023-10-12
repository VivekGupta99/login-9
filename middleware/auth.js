const jwt = require("jsonwebtoken");
const db = require("../util/database")
const User = require('../models/users')

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        console.log(token);
        const user = jwt.verify(token, 'secratekey');        // decripting the (userId + secratekey)
        console.log("userId==>", user.userId);
        User.findByPk(user.userId).then((user) => {
            if (!user) {
                console.log("user:", user)
                return res.status(404).json({ success: false, message: "User not found" });
            }
            req.user = user;        // Very important step
            next();
        });

    } catch (err) {
        console.log("Auth Error:", err);
        return res.status(401).json({ success: false });
    }
};

module.exports = authenticate;