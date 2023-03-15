const Book = require("../models/book.model.js");
// const Author = require("../models/author.model.js");

// Create and Save a new Book
exports.addBook = async (req, res) => {
  // Validate request
  if (!req?.body?.title) {
    return res.status(400).send({
      message: "Title can not be empty!",
    });
  }

  // Create a Book
  const book = {
    title: req.body.title,
    author_id: req.author.id,
    likes: [],
  };

  // Save Book in the database
  await Book.create(book)
    .then((data) => {
      res.status(201).json({
        message: "Book created successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};
