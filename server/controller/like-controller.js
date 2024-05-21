// controller/like-controller.js
const User = require("../models/user-model");
const Business = require("../models/business-model");

const likeService = async (req, res, next) => {
    const userId = req.user._id;
    const { serviceId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const service = await Business.findById(serviceId);
      if (!service) return res.status(404).json({ message: "Service not found" });
  
      const index = user.likedServices.indexOf(serviceId);
  
      if (index === -1) {
        // Service not liked, add to liked services
        user.likedServices.push(serviceId);
        service.likes += 1;
      } else {
        // Service already liked, remove from liked services
        user.likedServices.splice(index, 1);
        service.likes -= 1;
      }
  
      await user.save();
      await service.save();
  
      const message = index === -1 ? "Service liked successfully" : "Service unliked successfully";
      console.log(message)
      // Send the updated service object in the response
      res.status(200).json({ message, service });
    } catch (error) {
      console.error("Error liking service:", error);
      // Pass the error to the error middleware
      next(error);
    }
  };
  
const getLikedServices = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('likedServices');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ likedServices: user.likedServices });
  } catch (error) {
    console.error("Error fetching liked services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { likeService, getLikedServices };
