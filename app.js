require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db.config");
const Author = require("./models/author.model");

// Initialize the express app
const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

app.use("/api/authors", require("./routes/author.routes"));
app.use("/api/books", require("./routes/book.routes"));

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
