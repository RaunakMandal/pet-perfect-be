const Book = require("../models/book.model.js");

// Create and Save a new Book
exports.addBook = async (req, res) => {
  try {
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
          message:
            err.message || "Some error occurred while creating the Book.",
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Retrieve all Books from the database.
exports.getAllBooks = async (req, res) => {
  try {
    const { page, per_page, order } = req.query;
    await Book.findAll({
      offset: (page - 1) * per_page || 0,
      limit: per_page || 10,
      order: order ? [["likes_count", order]] : [],
    })
      .then((data) => {
        return res.status(200).json({
          total_books: data.length,
          books: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving books.",
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Like a book with the specified id in the request
exports.likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const author_id = req.author.id;

    // Check if book exists in the database
    await Book.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        // Check if author has already liked the book
        if (data.likes.includes(author_id)) {
          return res.status(400).json({
            message: "You have already liked this book",
          });
        } else {
          // Update the book likes and likes_count
          data
            .update(
              {
                likes: [...data.likes, author_id],
                likes_count: data.likes_count + 1,
              },
              { where: { id: id } }
            )
            .then((liked) => {
              return res.status(200).json({
                message: "Book liked successfully",
              });
            })
            .catch((err) => {
              return res.status(500).send({
                message:
                  err.message || "Some error occurred while liking the book.",
              });
            });
        }
      } else {
        return res.status(404).json({
          message: "Book not found",
        });
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Unlike a book with the specified id in the request
exports.unlikeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const author_id = req.author.id;
    await Book.findOne({ where: { id: id } })
      .then((data) => {
        if (data) {
          if (data.likes.includes(author_id)) {
            // Update the book likes by removing the author_id and decrement likes_count
            data.likes = data.likes.filter((like) => like !== author_id);
            data
              .update(
                {
                  likes: data.likes,
                  likes_count: data.likes_count - 1,
                },
                { where: { id: id } }
              )
              .then((unliked) => {
                return res.status(200).json({
                  message: "Book unliked successfully",
                });
              })
              .catch((err) => {
                return res.status(500).send({
                  message:
                    err.message || "Some error occurred while liking the book.",
                });
              });
          } else {
            return res.status(400).json({
              message: "You have not liked this book",
            });
          }
        } else {
          return res.status(404).json({
            message: "Book not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while unliking the book.",
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};
