const express = require("express")
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const db = require('./util/database')

db.sequelize.sync().then(() => {
    console.log("ok report")
}).catch(() => {
    console.log("error")
})

const controller = require('./controllers/user')

app.post('/users', (req, res) => {
    controller.createUser(req, res)
});


app.listen(3000);
