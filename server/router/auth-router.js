const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const signupSchema =require("../validator/auth-validator")
const validate =require("../middleware/validate-middleware")
const authMiddleware = require("../middleware/auth-middleware");



// Setting up middleware to parse JSON request bodies
router.use(express.json());

// Define routes


// router.route("/").post(authControllers.home);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/user").get(authMiddleware,authControllers.user);

// router.get("/", (req, res) => {
//   res.status(200).send("");
// });

// Export the router
module.exports = router;
