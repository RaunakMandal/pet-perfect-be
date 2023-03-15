const sequelize = require("../db/db.config.js");
const { DataTypes } = require("sequelize");

// Define the User model
const Author = sequelize.define(
  "Author",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: "authors",
    timestamps: true,
  }
);

async function createTable() {
  await Author.sync();
}

createTable();

// export Author model
module.exports = Author;
