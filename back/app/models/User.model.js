const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = Schema({
  username: { type: String, required: true},
  fullname: { type: String },
  password: { type: String, required: true}
});

module.exports = mongoose.model("user", UserSchema);
