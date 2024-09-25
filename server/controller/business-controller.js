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
      description,
    } = req.body;

    const images = req.files.map((file) => file.filename);

    // Parse serviceName as it is sent as a JSON string
    const parsedServiceName = JSON.parse(serviceName);

    const newBusiness = await Business.create({
      businessName,
      serviceName: parsedServiceName,
      stateName,
      cityName,
      address,
      businessLocation,
      email,
      contact,
      price,
      description,
      images,
    });

    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch all business data
const getAllBusinesses = async (req, res) => {
  try {
    console.log("Fetching all businesses");
    const businesses = await Business.find();
    console.log("Businesses fetched:", businesses);
    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a business
const updateBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;
    const updatedData = req.body;

    // Log incoming request data for debugging
    console.log("Received update request for business ID:", businessId);
    console.log("Updated data:", updatedData);

    // Check if images are uploaded
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.filename);
      updatedData.images = images;
      console.log("Received files:", req.files);
      console.log("Images to be updated:", images);
    }

    // Log updatedData before updating the database
    console.log("Data to be updated in the database:", updatedData);

    // Update business details in the database
    const updatedBusiness = await Business.findByIdAndUpdate(businessId, updatedData, { new: true });

    if (!updatedBusiness) {
      console.log("Business not found");
      return res.status(404).json({ error: "Business not found" });
    }

    console.log("Business updated successfully:", updatedBusiness);
    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a business
const deleteBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;
    console.log("Received delete request for business ID:", businessId);

    const deletedBusiness = await Business.findByIdAndDelete(businessId);

    if (!deletedBusiness) {
      console.log("Business not found");
      return res.status(404).json({ error: "Business not found" });
    }

    console.log("Business deleted successfully:", deletedBusiness);
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a review to a business
const addReview = async (req, res) => {
  try {
    console.log("Received add review request");
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    const { id } = req.params;
    const { rating, comment } = req.body;
    const user = req.user.email; // Assuming user email is stored in req.user

    const business = await Business.findById(id);
    if (!business) {
      console.log("Business not found");
      return res.status(404).json({ error: "Business not found" });
    }

    business.reviews.push({ user, rating, comment });
    await business.save();

    console.log("Review added successfully:", { user, rating, comment });
    res.status(201).json(business);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { businessForm, getAllBusinesses, updateBusiness, deleteBusiness, addReview };
