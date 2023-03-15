const express = require("express");
const { signup, signin } = require("../controllers/author.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Export the router
module.exports = router;
