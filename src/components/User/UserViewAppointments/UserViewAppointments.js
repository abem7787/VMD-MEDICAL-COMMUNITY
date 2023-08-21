import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditDialogue from '../EditDialogue/EditDialogue';
import jwt_decode from "jwt-decode";
import { UserHeader } from '../UserHeader/UserHeader';



import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // Import Axios library
import { Button } from '@material-ui/core';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'teal',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  







const UserViewAppointments = () => {
    const location = useLocation();
    const [appointments, setAppointments] = useState([]);
    const [deletedAppointment, setDeletedAppointment] = useState(false); // New state
    const [editedAppointment, setEditedAppointment] = useState(false); // New state
    const [email, setEmail] = useState();
    const [selectedAppointment, setSelectedAppointment] = useState(null); // New state


    const [handleOpenForm, setHandleOpenForm] = useState(false);

    // const searchParams = new URLSearchParams(location.search);
    // const email = searchParams.get('email');

    const [loggedinUser, setLoggedinUser] = useState(false);

    const handleDelete = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:8800/users/handledelete",
                { id, email }
            );

            if (response.status === 200) {
                // Set deletedAppointment to trigger useEffect
                setDeletedAppointment(!deletedAppointment);
                console.log('Appointment deleted successfully');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the appointment');
        }
    }

    const handleEdit = async (id) => {
        setSelectedAppointment(id); // Set the selected appointment for editing

        setHandleOpenForm(true);
    }

    async function getUsername() {
        const token = localStorage.getItem("token");
          
        if (!token) return Promise.reject("Cannot find Token");
        let decode = jwt_decode(token);
        let decodedEmail = decode.email;
        console.log("this is decoded email: " + decodedEmail);
        setEmail(decodedEmail);
    
        try {
            const response = await axios.post(
                "http://localhost:8800/users/getuserappointments",
                { email: decodedEmail }
            );
    
            if (response.status === 200) {
                setAppointments(response.data);
                console.log('Fetched all appointments');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while getting appointments');
        }
    }
    
    useEffect(() => {
        getUsername();
    }, [email, deletedAppointment, editedAppointment]);
    

    return (
        <div style={{marginTop:'100px'}} >
        <UserHeader></UserHeader>
        <TableContainer component={Paper} sx={{ width: '75%', margin: '0 auto' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Day</StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <StyledTableRow key={appointment._id}>
                  <StyledTableCell component="th" scope="row">
                    {appointment.email}
                  </StyledTableCell>
                  <StyledTableCell align="center">{appointment.name}</StyledTableCell>
                  <StyledTableCell align="center">{appointment.Day}</StyledTableCell>
                  <StyledTableCell align="center">{appointment.Time}</StyledTableCell>
                  <StyledTableCell align="center">
                  <Button
          onClick={() => { handleEdit(appointment._id) }}
          disabled={!appointment.canBeEditedBool} // Disable the button based on the value
        >
          Edit
        </Button>                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <Button
          onClick={() => handleDelete(appointment._id)}
          disabled={!appointment.canBeEditedBool} // Disable the button based on the value
        >
          Delete
        </Button>                  </StyledTableCell>
                  {selectedAppointment === appointment._id && (
                            <EditDialogue
                                editedAppointment={editedAppointment}
                                setEditedAppointment={setEditedAppointment}
                                id1={appointment._id}
                                name1={appointment.name}
                                age1={appointment.age}
                                email1={appointment.email}
                                Time1={appointment.Time}
                                Day1={appointment.Day}
                                gender1={appointment.gender}
                                open={true}
                                setOpen={setSelectedAppointment} // Close the dialog by setting selectedAppointment to null
                            />
                        )}   
                </StyledTableRow>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );
};

export default UserViewAppointments;
