const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // required: true,
      default:"user"
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // tripList: {
    //   type: Array,
    //   default: [],
    // },
    // wishList: {
    //   type: Array,
    //   default: [],
    // },
    // propertyList: {
    //   type: Array,
    //   default: [],
    // },
    // reservationList: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
