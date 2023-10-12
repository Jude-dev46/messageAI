require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });
    console.log("Connected to DB!!!");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = InitiateMongoServer;
