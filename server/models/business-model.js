const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  serviceName: { type: [String], required: true },
  stateName: { type: String, required: true },
  cityName: { type: String, required: true },
  address: { type: String, required: true },
  businessLocation: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: false },
  price: { type: String, required: false },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  reviews: [reviewSchema]
}, {
  collection: "services"
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
