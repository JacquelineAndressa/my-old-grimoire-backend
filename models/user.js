const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long."],
  },
});

module.exports = mongoose.model("User", userSchema);
