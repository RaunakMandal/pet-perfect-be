require("dotenv").config();
const express = require("express");

// Initialize the express app
const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

app.use("/api/authors", require("./routes/author.routes"));
app.use("/api/books", require("./routes/book.routes"));

// const port = process.env.APP_PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;