const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cron = require("node-cron");

const appointmentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    Day: { type: String },
    Time: { type: String },

    name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    description: {
      type: String,
    },
    bookedby:{
      type: String,
    },

    timer: {
      type: Number,  // Represents remaining time in seconds
      default: 30 * 60,  // 30 minutes in seconds
    },

    canBeEditedBool: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Middleware to start the timer when a new document is created
appointmentSchema.pre("save", function (next) {
  if (this.isNew) {
    this.timer = 30 * 60;  // 30 minutes in seconds
  }
  next();
});

// Method to check if editing is allowed based on the timer
appointmentSchema.methods.canBeEdited = function () {
  const currentTime = new Date();
  const createdAtTime = this.createdAt;
  const timeDifferenceInSeconds = Math.floor((currentTime - createdAtTime) / 1000);
  
  return timeDifferenceInSeconds <= 30 * 60;  // 30 minutes in seconds
};

// Update method to set canBeEditedBool based on the timer
appointmentSchema.statics.updateCanBeEditedStatus = async function () {
  const appointments = await this.find();
  const currentTime = new Date();

  appointments.forEach(async (appointment) => {
    const createdAtTime = appointment.createdAt;
    const timeDifferenceInSeconds = Math.floor((currentTime - createdAtTime) / 1000);
    const canBeEditedBool = timeDifferenceInSeconds <= 30 * 60;

    await appointment.updateOne({ canBeEditedBool });
  });
};

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Schedule the update logic to run every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  console.log("Updating canBeEditedBool status...");
  await Appointment.updateCanBeEditedStatus();
  console.log("Updated canBeEditedBool status for all appointments.");
});

module.exports = Appointment;
