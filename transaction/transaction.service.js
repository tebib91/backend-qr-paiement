const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
Transaction = require('../transaction/transaction.model');
const User = db.User;


module.exports = {
    createT,
    getAll,
    getById
};


async function getAll() {
    return await Transaction.find().select('-hash');
}

async function getById(id) {
    return await Transaction.findById(id).select('-hash');
}

async function createT(req, res, next) {
    // validate
    console.log(req);

    // const userSource = await User.findById({ id: transactionDetail.sourceID });
    // const userClient = await User.findById({ username: transactionDetail.clientID });
    User.findById(req.sourceID, function (err, value) {
        if (err) {
            return next(err);
        } else {
            console.log("RESULT: " + value);
            User.findById(req.clientID, function (err, res) {
                if (err) { return next(err); } else {
                    res.solde = res.solde - req.montant
                    console.log("RESULT:2 " + res);
                    User.update(res);
                }
            });
        }

    });

    // if (user) {
    //     user.solde = user.solde - transactionDetail.montant
    // }

    // const transaction = new Transaction(transactionDetail);


    // // save user
    // await transaction.save();
}


async function _delete(id) {
    await Transaction.findByIdAndRemove(id);
}