const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .state(401)
      .json({ message: "unauthorized HTTP ,token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware:", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETKEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
        password:0,
    });
    console.log(userData);

    req.user=userData;
    req_token=token;
    req.userID=userData._id;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized . Invaild Token" });
  }
};

module.exports = authMiddleware;
