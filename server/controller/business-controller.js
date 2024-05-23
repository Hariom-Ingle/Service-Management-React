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
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 

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
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(updatedBusiness);
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Delete Service  Function //
const deleteBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;
    const deletedBusiness = await Business.findByIdAndDelete(businessId);

    if (!deletedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { businessForm, getAllBusinesses,updateBusiness,deleteBusiness };
