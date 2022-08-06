const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusModel = new Schema({
    orderId: {type: String , required: true},
    orderStatus: {type: String, required: true, default: "Placed"},
}, {
    timestamps: true
});

const orderStatusSchema = mongoose.model("OrderStatusModel", orderStatusModel);
module.exports = orderStatusSchema;