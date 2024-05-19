const Business = require("../models/business-model");

// Create a new business
const businessForm = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    if (req.files) {
      console.log("File data:", req.files);
    }

    const {
      businessName,
      serviceName,
      stateName,
      cityName,
      address,
      businessLocation,
      email,
      contact,
      price,
      description
    } = req.body;

    const images = req.files.map(file => file.filename);

    const newBusiness = await Business.create({
      businessName,
      serviceName,
      stateName,
      cityName,
      address,
      businessLocation,
      email,
      contact,
      price,
      description,
      images
    });

    res.status(201).json(newBusiness);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all business data
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { businessForm, getAllBusinesses };
