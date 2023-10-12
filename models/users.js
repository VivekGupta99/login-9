const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
    Name: {
        type: Sequelize.STRING,

    },
    Email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,

    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ispremiumuser: Sequelize.BOOLEAN,

});

module.exports = User;