// email pass age

const mongoose = require("mongoose");

const beautySchema = mongoose.Schema({
  rating: Number,
  ratingCount: String,
  seprator: String,
  imagehref: String,
  image: String,
  brand: String,
  size: String,
  discountedPrice: String,
  strike: String,
  discountPercentage: String,
  category: String,
  subcategory: String,
  color: String,
});

const BeautyModel = mongoose.model("beauty", beautySchema);

module.exports = {
  BeautyModel,
};
