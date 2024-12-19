const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String },
  password: { type: String, required: true },
  Confpassword: { type: String },
  country: { type: String },
  state: { type: String },
  pincode: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
