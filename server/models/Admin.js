const mongoose = require("mongoose");
const validator = require("validator");
const Admin = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,

    // validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,

  },

  editedappointments: [{type:mongoose.Schema.Types.ObjectId,ref:"Appointment"}],
});
module.exports = mongoose.model("Admin", Admin);