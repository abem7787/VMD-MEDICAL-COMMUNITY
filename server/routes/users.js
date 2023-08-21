var express = require('express');
var router = express.Router();


const {registerUser, loginUser, appointmentBooking, AddIdInUser, getuserappointments, handleDelete, editAppointment, getAllAppointments, handleDeleteForAdmin, editAppointmentbyadmin, getadminnotifications, getusernotifications,  } =require('../controllers/UserController');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registeruser', registerUser);
router.post('/loginuser', loginUser);
router.post('/appointmentbooking', appointmentBooking);
router.post('/addIdInUser', AddIdInUser);
router.post('/getuserappointments', getuserappointments);
router.post('/handledelete', handleDelete);
router.post('/handleedit', editAppointment);
router.get('/getallappointments', getAllAppointments);
router.post('/handledeleteforadmin', handleDeleteForAdmin);
router.post('/handleeditbyadmin', editAppointmentbyadmin);
router.get('/getadminnotifications', getadminnotifications);
router.post('/getusernotifications', getusernotifications);



module.exports = router;
