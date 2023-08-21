const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Admin = require("../models/Admin");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = new User({
            _id: new mongoose.Types.ObjectId(), // Generate a unique ObjectId as _id
            email,
            password,
 
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle error
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser= async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find a user with the provided email
      const user = await User.findOne({ email });
  
      // If user is not found
      if (!user) {
        return res.status(401).json({ message: 'User with this email doesnt exist' });
      }
  
      // Check if the password matches
      if (user.password === password) {

        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );

        return res.status(200).send({
          msg: "Login Successful...!",
          email: user.email,
          userId: user._id,
          token,
        });


      } else {
      
        return res.status(401).json({ message: 'Incorrect credentials' });
        
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'An error occurred' });
    }
};


const appointmentBooking =  async (req, res) => {
  try {
    const {
      email,
      name,
      gender,
      age,
      description,
      time,
      day,
      bookedby
    } = req.body;
    console.log("this is booked by : "+bookedby)

    const newAppointment = new Appointment({
      _id: new mongoose.Types.ObjectId(), // Generate a unique ObjectId as _id
      email,
      name,
      gender,
      age,
      description,
      Time:time,
      Day:day,
      bookedby
    });

    const savedAppointment = await newAppointment.save();

    console.log('New appointment created:', savedAppointment);

    res.status(201).json({ id: savedAppointment._id });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Appointment creation failed' });
  }
};

const AddIdInUser = async (req, res) => {
  const { decodedEmail, appointmentId } = req.body;
  // const email = 'wolfboy0786@gmail.com'
  let email = decodedEmail;
  console.log("this is email "+email)



  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("NOT FOUNNNNNDDD")
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the appointments array
    if (!user.appointments) {
      user.appointments = []; // If not, create an empty array
    }

    // Add the appointmentId to the appointments array
    user.appointments.push(appointmentId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Appointment added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getuserappointments = async (req, res) => {
  try {
    const userEmail = req.body.email;

    // Find the user by email
    const user = await User.findOne({ email: userEmail }).populate('appointments');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log each appointment
    user.appointments.forEach(appointment => {
      console.log('Appointment:', appointment.name);
      // Since you don't want to use "appointmentDetails," you can omit this line.
    });

    res.status(200).json(user.appointments);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const handleDelete = async (req, res) => {
  try {
    const appointmentId = req.body.id;
    const email = req.body.email;

    // Validate appointmentId
    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required in the request body.' });
    }

    // Delete the appointment by ID
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Remove the appointmentId from the user's appointments array
    user.appointments = user.appointments.filter(app => app.toString() !== appointmentId);
    await user.save();

    res.json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

function editAppointment(req, res) {
  const id = req.body.id;
  const { name, email, time, day, gender, age } = req.body;

  const appointmentUpdates = {
    name: name,
    email: email,
    Time: time,
    Day: day,
    gender: gender,
    age: age,
  };

  // Update the appointment document using the provided id
  Appointment.findOneAndUpdate({ _id: id }, appointmentUpdates, { new: true })
    .then((appointment) => {
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found.",
        });
      }

      // Add the appointment ID to the editedappointments array in Admin collection
      Admin.findOneAndUpdate(
        {},
        { $push: { editedappointments: id } }, // Add the appointment ID to the array
        { new: true, upsert: true } // Create if doesn't exist
      )
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Appointment successfully updated",
            appointment: appointment,
          });
        })
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "Error updating Admin collection.",
            error: err.message,
          })
        );
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      })
    );
}

function editAppointmentbyadmin(req, res) {
  const id = req.body.id;
  const { name, email, time, day, gender, age } = req.body;
  let bookedby;

  const appointmentUpdates = {
    name: name,
    email: email,
    Time: time,
    Day: day,
    gender: gender,
    age: age,
  };

  // Update the appointment document using the provided id
  Appointment.findOneAndUpdate({ _id: id }, appointmentUpdates, { new: true })
    .then((appointment) => {
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found.",
        });
      }

      bookedby = appointment.bookedby;
      console.log("this is bookedby status: "+bookedby)

      // Add the appointment ID to the editedappointments array in User collection
      User.findOneAndUpdate(
        { email: bookedby }, // Find the user by their email
        { $push: { editedappointments: id } }, // Add the appointment ID to the array
        { new: true, upsert: true } // Create if doesn't exist
      )
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Appointment successfully updated",
            appointment: appointment,
          });
        })
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "Error updating User collection.",
            error: err.message,
          })
        );
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      })
    );
}

const getAllAppointments =async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

const handleDeleteForAdmin = async (req, res) => {
  try {
    const appointmentId = req.body.id;


    // Validate appointmentId
    if (!appointmentId) {
      return res.status(400).json({ error: 'Appointment ID is required in the request body.' });
    }

    // Delete the appointment by ID
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }


    res.json({ message: 'Appointment deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

const getadminnotifications = async (req, res) => {
  try {
    // Find the Admin document
    const admin = await Admin.findOne();

    // Populate the editedappointments array with appointment names
    await admin.populate('editedappointments');


    // Extract appointment names
    const appointmentNames = admin.editedappointments.map(appointment => appointment.name);

    // Send the array of appointment names as a response
    console.log(appointmentNames);
    res.json(appointmentNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getusernotifications = async (req, res) => {
  try {
    // Extract email from the request body
    const decodedEmail = req.body.decodedEmail;
    

    // Find the User document by email
    const user = await User.findOne({ email: decodedEmail }).populate('editedappointments');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract appointment names from the populated array
    const appointmentNames = user.editedappointments.map(appointment => appointment.name);

    // Send the array of appointment names as a response
    console.log(appointmentNames);
    res.json(appointmentNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};












module.exports = { registerUser, loginUser, appointmentBooking, AddIdInUser, getuserappointments, handleDelete, editAppointment, getAllAppointments, handleDeleteForAdmin, editAppointmentbyadmin,getadminnotifications, getusernotifications};