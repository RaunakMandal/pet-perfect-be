const express = require("express");
const {
  signup,
  signin,
  isSignedIn,
  getAllAuthors,
} = require("../controllers/author.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Custom Routes
router.get("/", isSignedIn, getAllAuthors);

// Export the router
module.exports = router;
