const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Business",
  },
  review: {
    type: String,
  },
  rate: {
    type: String,
  },
 
}, { timestamps: true });


const Review = mongoose.model('Review',ReviewSchema);

module.exports = Review;