const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  serviceName: { type: String, required: true },
  stateName: { type: String, required: true },
  cityName: { type: String, required: true },
  address: { type: String, required: true },
  businessLocation: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String] } // Store multiple images
}, {
  collection: "services"
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
