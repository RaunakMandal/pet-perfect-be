const express = require("express");
const { isSignedIn } = require("../controllers/author.controller");
const { addBook } = require("../controllers/book.controller");
const router = express.Router();

router.post("/add", isSignedIn, addBook);

// Export the router
module.exports = router;
