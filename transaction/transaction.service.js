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

async function createT(transactionDetail) {
    // validate
    const user = await User.find({ username: transactionDetail.sourceID });
    console.log(user);

    if (user) {
        user.solde = user.solde - transactionDetail.montant
    }

    const transaction = new Transaction(transactionDetail);


    // save user
    await transaction.save();
}


async function _delete(id) {
    await Transaction.findByIdAndRemove(id);
}