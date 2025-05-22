const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  refreshToken: { type: String, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  prompts: { type: Number, default: 0 },
  password: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", userSchema);
