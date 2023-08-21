import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { TextArea } from 'semantic-ui-react';
import axios from 'axios';

export default function AdminEditDialogue({editedAppointment, setEditedAppointment, id1, name1, email1, gender1, age1, Day1,Time1, open, setOpen }) {
    const [id, setId] = React.useState(id1);

    const [selectedDay, setSelectedDay] = React.useState(Day1);
  const [email, setEmail] = React.useState(email1);
  const [name, setName] = React.useState(name1);
  const [gender, setGender] = React.useState(gender1);
  const [age, setAge] = React.useState(age1);
  const [time, setTime] = React.useState(Time1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit= async()=>{
    setOpen(false);

    try {
        const response = await axios.post(
            "http://localhost:8800/users/handleeditbyadmin",
            { id, email, name, age, gender, time, day:selectedDay }
        );

        if (response.status === 200) {
            // Set deletedAppointment to trigger useEffect
            setEditedAppointment(!editedAppointment)
            console.log('Appointment Edited successfully');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the appointment');
    }



  }

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
 
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={name}
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="gender"
            label="Gender"
            type="text"
            fullWidth
            variant="standard"
            value={gender}
            onChange={handleGenderChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={age}
            onChange={handleAgeChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label=""
            type="time"
            fullWidth
            variant="standard"
            value={time}
            onChange={handleTimeChange}
          />
          <TextField
            select
            autoFocus
            margin="dense"
            id="day"
            label="Day"
            value={selectedDay}
            onChange={handleDayChange}
            fullWidth
            variant="standard"
          >

            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
