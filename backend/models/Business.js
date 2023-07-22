const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusinessSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  location: {
    type: String,
    required: [true, "Location field is required"],
  },
  address: {
    type: String,
    required: [true, "Address field is required"],
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
  businessImage: {
    type: String,
  },
});


const Business = mongoose.model('Business',BusinessSchema);

module.exports = Business;