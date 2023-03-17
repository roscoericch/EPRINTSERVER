const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup");
router.post("/login", authMiddleware);

module.exports = router;
