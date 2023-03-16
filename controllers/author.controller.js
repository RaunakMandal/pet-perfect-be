const bcrypt = require("bcrypt");
const Author = require("../models/author.model");
const jwt = require("jsonwebtoken");
const Book = require("../models/book.model");

exports.signup = async (req, res) => {
  // Validate request
  try {
    if (
      !req?.body?.name ||
      !req?.body?.email ||
      !req?.body?.phone_no ||
      !req?.body?.password
    ) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    // Create a User
    const password = bcrypt.hashSync(req.body.password, 10);
    const author = {
      name: req.body.name,
      email: req.body.email,
      phone_no: req.body.phone_no,
      password: password,
    };

    // Save User in the database
    await Author.create(author)
      .then((data) => {
        return res.status(201).json({
          message: "User created successfully",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.signin = async (req, res) => {
  try {
    // Validate request
    if (!req?.body?.email || !req?.body?.password) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const { email, password } = req.body;
    // Find a single User with a email
    await Author.findOne({ where: { email: email } })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "User Not found.",
          });
        }

        const isPasswordValid = bcrypt.compareSync(password, data.password);

        if (!isPasswordValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        return res.status(200).json({
          message: "User logged in successfully",
          accessToken: jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
            expiresIn: 86400, // 24 hours
          }),
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving User with email=" + email,
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Custom Middleware to check if user is signed in
exports.isSignedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.author = await Author.findByPk(decoded.id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "books"],
      },
    });
    if (!req.author) {
      throw new Error();
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource" });
  }
};

// Custom Methods for given doc
exports.getAllAuthors = async (req, res) => {
  try {
    await Author.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    }).then((data) => {
      const authors = data.map(async (author) => {
        return {
          id: author.id,
          name: author.name,
          email: author.email,
          phone_no: author.phone_no,
          books_count: await Book.count({
            where: {
              author_id: author.id,
            },
          }),
        };
      });

      // Wait for all promises to resolve and return the result
      Promise.allSettled(authors).then((authors) => {
        const response = authors.map((author) => author.value);
        return res.status(200).json(response);
      });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getBooks = async (id) => {
  return await Book.findAll({
    where: {
      author_id: id,
    },
    attributes: {
      exclude: ["author_id", "createdAt", "updatedAt"],
    },
  });
};

exports.getAuthor = async (req, res) => {
  try {
    const id = req.params.id;

    await Author.findByPk(id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    }).then(async (data) => {
      if (!data) {
        return res.status(404).send({
          message: "Author Not found.",
        });
      }

      const author = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone_no: data.phone_no,
        books: await getBooks(data.id),
      };

      return res.status(200).json(author);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getMe = async (req, res) => {
  try {
    const id = req.author.id;
    await Author.findByPk(id, {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    }).then(async (data) => {
      if (!data) {
        return res.status(404).send({
          message: "Author Not found.",
          req: req,
          fuck: "dsa",
        });
      }

      const author = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone_no: data.phone_no,
        books: await getBooks(data.id),
      };

      return res.status(200).json(author);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};