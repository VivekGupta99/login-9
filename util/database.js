const Sequelize = require('sequelize')
const path = require("path")

const sequelize = new Sequelize('new', 'root', 'Sql@123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('../models/loginModel')(sequelize, Sequelize);
db.expanses = require('../models/expanseModel')(sequelize, Sequelize);
module.exports = db;