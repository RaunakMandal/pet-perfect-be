const express = require("express");
const {
  signup,
  signin,
  isSignedIn,
  getAllAuthors,
  getAuthor,
  getMe,
} = require("../controllers/author.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// Custom Routes
router.get("/", isSignedIn, getAllAuthors);
router.get("/me", isSignedIn, getMe);
router.get("/:id", isSignedIn, getAuthor);

// Export the router
module.exports = router;
