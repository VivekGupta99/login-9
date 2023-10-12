const express = require("express")
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// const dotenv = require("dotenv");
// dotenv.config();

const sequelize = require("./util/database");

const User = require("./models/users");
const Expense = require("./models/expanseModel");
const Order = require("./models/orders");


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



const userRoutes = require('./routes/userRoutes');
const expanseRoutes = require('./routes/expanseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');


sequelize.sync().then(() => {
    console.log('ok report');
}).catch((error) => {
    console.error('Error syncing database:', error);
});


// Mount the routes
app.use('/user', userRoutes); // Example base path for user-related routes
app.use('/expanse', expanseRoutes); // Example base path for expanse-related routes
app.use('/purchase', purchaseRoutes); // Example base path for purchase-related routes


app.listen(3000);
