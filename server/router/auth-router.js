const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const signupSchema =require("../validator/auth-validator")
// const validate =require("../validator/auth-validator")
const validate =require("../middleware/validate-middleware")


// Setting up middleware to parse JSON request bodies
router.use(express.json());

// Define routes


// router.route("/").post(authControllers.home);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(authControllers.login);


router.get("/", (req, res) => {
  res.status(200).send("jsbhvk");
});

// Export the router
module.exports = router;
