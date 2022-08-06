const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModel = new Schema({
    capacityRequired: {type: Number , required: true},
    userId: {type: String, required: true},
    companyId: {type: String, required: true},
    paymentStatus: {type: String, required: true}, // Paid, Unpaid
    paymentWay: {type: String, required: true}, // COD, Online, Card
}, {
    timestamps: true
});

const orderSchema = mongoose.model("OrderModel", orderModel);
module.exports = orderSchema;