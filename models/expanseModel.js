const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expenses = sequelize.define("expenses", {

    amount: {
        type: Sequelize.FLOAT,
        validate: {
            isFloat: true
        }
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
})
module.exports = Expenses;