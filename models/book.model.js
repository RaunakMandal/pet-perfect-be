const sequelize = require("../db/db.config.js");
const { DataTypes } = require("sequelize");
const Author = require("./author.model.js");

// Define the User model
const Book = sequelize.define(
  "Book",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    tableName: "books",
    timestamps: true,
  }
);

async function createTable() {
  await Book.sync();
}

createTable();

// export Book model
module.exports = Book;
