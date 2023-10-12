const Razorpay = require('razorpay');
const Order = require("../models/orders");
const jwt = require("jsonwebtoken");

const userController = require("./user");

function generateAccessToken(id, premium) {
    let x = jwt.sign({ userId: id, ispremiumuser: premium }, "secretKey");
    return x;
}


exports.purchasePremium = async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: 'rzp_test_c4lJbo6gAymSLO',
            key_secret: 'HDE4863A0R58p1WR5WZmUbae',
        });
        const amount = 25000;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user
                .createOrder({ orderid: order.id, status: "PENDING" })
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};


exports.updateTransactionStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
        const promise1 = order.update({
            paymentid: payment_id,
            status: "SUCCESSFUL",
        });
        const promise2 = req.user.update({ ispremiumuser: true });

        Promise.all([promise1, promise2])
            .then(() => {
                return res.status(202).json({
                    sucess: true,
                    message: "Transaction Successful",
                    token: generateAccessToken(userId, true),
                });
            })
            
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Sometghing went wrong" });
    }
};

exports.updateTransactionStatusFailed = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
        await order.update({ paymentid: payment_id, status: "failed" });
        return res.status(202).json({ success: true, message: "updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ message: error, success: false });
    }
};
