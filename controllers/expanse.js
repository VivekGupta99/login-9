const expanseModel = require('../models/expanseModel');
const db = require('../util/database');

const path = require('path');
const Expense = db.expanses

async function creatingExpanse(req, res) {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "Bad Data"
            })
        }

        const { amount, description, category } = req.body;
        // Expense.create({ amount, description, category }).then((data) => {
        //     res.status(200).send(data)
        // }).catch((err) => {
        //     res.status(500).send(err);
        // })
        const exp = await Expense.create({ amount, description, category })
        if (exp) {
            res.status(200).send({ message: "Expense added" })
        } else {
            res.status(402).send({ message: "something went wrong!" })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function gettingData(req, res) {
    Expense.findAll().then((data) => {

        res.status(200).send(data)
    })
}

async function deleteExpanseData(req, res) {
    const expanseId = req.params.expanseId;
    if (expanseId == undefined || expanseId.length == 0) {
        res.json({success : false, message: "didn't get the id"})
    }
    Expense.destroy({ where: { id: req.params.expanseId } })
        .then(() => {
            res.send("deleted")
        })
        .catch((error) => {
            res.status(500).send(error);
        })
}

module.exports = { creatingExpanse, gettingData, deleteExpanseData }
