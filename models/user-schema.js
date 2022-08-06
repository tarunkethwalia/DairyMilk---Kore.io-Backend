const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    viewPassword: { type: String, required: true },
}, {
    timestamps: true
});

const userSchema = mongoose.model("UserModel", userModel);
module.exports = userSchema;