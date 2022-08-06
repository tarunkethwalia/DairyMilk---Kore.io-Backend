const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyModel = new Schema({
  companyName: {type: String , required: true},
  email: {type: String, required: true},
  totalCapacity: {type: Number, required: true, default: 100},
  capacityLeft: {type: Number, required: true, default: 100},
}, {
  timestamps: true,
});

const companySchema = mongoose.model('CompanyModel', companyModel);
module.exports = companySchema;