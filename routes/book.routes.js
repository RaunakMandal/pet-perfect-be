const express = require("express");
const { isSignedIn } = require("../controllers/author.controller");
const {
  addBook,
  getAllBooks,
  likeBook,
  unlikeBook,
} = require("../controllers/book.controller");
const router = express.Router();

router.get("/", isSignedIn, getAllBooks);
router.post("/add", isSignedIn, addBook);
router.put("/like/:id", isSignedIn, likeBook);
router.put("/unlike/:id", isSignedIn, unlikeBook);

// Export the router
module.exports = router;
