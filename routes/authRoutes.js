const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const signupHandler = require("../controller/authcontrollers/signupController");
const loginHandler = require("../controller/authcontrollers/loginController");

router.post("/signup", signupHandler);
router.post("/login", loginHandler);

module.exports = router;
