const bcrypt = require("bcrypt");
const Author = require("../models/author.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  // Validate request
  try {
    console.log(req.body);
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
        res.status(500).send({
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
        console.log(err);
        return res.status(500).send({
          message: "Error retrieving User with email=" + email,
        });
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.isSignedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.author = await Author.findByPk(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized to access this resource" });
  }
};
