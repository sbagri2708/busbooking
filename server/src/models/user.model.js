const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  phonenumber: String,
  address: String,
  gender: String,
});
const UserModel = model("userss", UserSchema);

module.exports = UserModel;
