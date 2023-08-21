import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // Import Axios library
import { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { Button } from '@material-ui/core';
import AdminEditDialogue from "../AdminEditDialogue/AdminEditDialogue"
import { AdminHeader } from '../AdminHeader/AdminHeader';


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

export default function AdminViewAppointments() {

  const [editedAppointment, setEditedAppointment] = useState(false); // New state

  const [selectedAppointment, setSelectedAppointment] = useState(null); // New state

  const [deletedAppointment, setDeletedAppointment] = useState(false); // New state

  const [appointments, setAppointments] = React.useState([]); // State to hold appointment data
  const [handleOpenForm, setHandleOpenForm] = useState(false);


  const handleEdit = async (id) => {
    setSelectedAppointment(id); // Set the selected appointment for editing


    setHandleOpenForm(true);
}

  React.useEffect(() => {
    // Fetch appointment data from your backend API
    axios.get('http://localhost:8800/users/getallappointments') // Replace with your actual API endpoint
      .then(response => {
        setAppointments(response.data); // Update the state with fetched data
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, [deletedAppointment , editedAppointment]); // Empty dependency array means this effect runs only once, on component mount

  const handleDelete = async (id) => {
    try {
        const response = await axios.post(
            "http://localhost:8800/users/handledeleteforadmin",
            { id }
        );

        if (response.status === 200) {
            // Set deletedAppointment to trigger useEffect
            setDeletedAppointment(!deletedAppointment);
            toast.success('Appointment deleted successfully');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the appointment');
    }
}

  return (
    <div style={{marginTop:'100px'}} >
    <AdminHeader></AdminHeader>
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
        </Button>                </StyledTableCell>
              <StyledTableCell align="center">
              <Button
          onClick={() => handleDelete(appointment._id)}
          disabled={!appointment.canBeEditedBool} // Disable the button based on the value
        >
          Delete
        </Button>                </StyledTableCell>
              {selectedAppointment === appointment._id && (
                        <AdminEditDialogue
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
}
