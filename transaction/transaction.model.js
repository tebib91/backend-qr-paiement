const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    sourceID: { type: String, ref: 'User' },
    clientID: { type: String, ref: 'User' },
    montant: { type: Number },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Transaction', schema);