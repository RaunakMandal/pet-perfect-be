const express = require("express");
const { isSignedIn } = require("../controllers/author.controller");
const router = express.Router();

router.get("/", isSignedIn, (req, res) => {
  res.send("Hello World");
});

// Export the router
module.exports = router;
