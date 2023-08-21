import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { useEffect } from 'react';
import {Text} from  "@mantine/core";
import jwt_decode from "jwt-decode";

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [notifications, setNotifications] = React.useState();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  useEffect(() => {

    const token = localStorage.getItem("token");
          
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token);
    let decodedEmail = decode.email;
    console.log("this is decoded email: " + decodedEmail);

    // Fetch appointment data from your backend API
    axios.post('http://localhost:8800/users/getusernotifications',{decodedEmail}) // Replace with your actual API endpoint
      .then(response => {
        console.log('this is data');
        console.log(response.data); // Use response.data instead of response.json()
        setNotifications(response.data); // Update the state with fetched data
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Notifications</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notifications && notifications.map((email) => (
          <ListItem sx={{borderBottom:'1px solid teal', marginLeft:'20px', marginRight:'20px' }} disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
            <ListItemText primary={`Appointment for ${email} has been edited`} />

            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
     
            </ListItemAvatar>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function NotfUser({open, setOpen}) {
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>

      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}