import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import jwt_decode from "jwt-decode";



const AppointmentForm = ({email1}) => {
    const [email, setEmail] = useState();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState();
    const [time, setTime] = useState();
    const [day, setDay] = useState('');
    const [decodedToken, setDecodedToken] = useState();
    const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
    const [decodedEmail, setDecodedEmail] = useState();

    const handleTimeChange = (event) => {
        setTime(event.target.value);
      };

      async function getUsername() {
        const token = localStorage.getItem("token");
      
        if (!token) return Promise.reject("Cannot find Token");
        let decode = jwt_decode(token);
        let decodedEmail1 = decode.email;
        console.log("this is decoded email: "+decodedEmail)
        setDecodedEmail(decodedEmail1);

        setDecodedToken(decode);
      }
    
      useEffect(() => {
        getUsername();
      }, []); 




    const daysOptions = [
        { key: 'monday', text: 'Monday', value: 'Monday' },
        { key: 'tuesday', text: 'Tuesday', value: 'Tuesday' },
        { key: 'wednesday', text: 'Wednesday', value: 'Wednesday' },
        { key: 'thursday', text: 'Thursday', value: 'Thursday' },
        { key: 'friday', text: 'Friday', value: 'Friday' },
        { key: 'saturday', text: 'Saturday', value: 'Saturday' },
        { key: 'sunday', text: 'Sunday', value: 'Sunday' }
    ];

    const genderOptions = [
        { key: 'male', text: 'Male', value: 'Male' },
        { key: 'female', text: 'Female', value: 'Female' },
        { key: 'preferNotToSay', text: 'Prefer Not to Say', value: 'Prefer Not to Say' }
    ];

    const timeOptions = Array.from({ length: 24 }, (_, hour) => ({
        key: hour,
        text: `${hour.toString().padStart(2, '0')}:00`,
        value: hour
    }));

    const handleSubmit = async () => {
        try {

            console.log(email, name, gender, age, description, time, day  )
            console.log(typeof(time));
            const response = await axios.post(
                "http://localhost:8800/users/appointmentbooking",
                { email, name, gender, age, description, time, day }
            );

            if (response.data) {
                console.log(response.data.id)
                let appointmentId = response.data.id;
                alert('Appointment booked successfully!');
                console.log("this is app id" + appointmentId);
                const response1 = await axios.post(
                    "http://localhost:8800/users/addIdInUser",
                    { decodedEmail, appointmentId }
                );
                if(response1.data){
                    alert("Hurrah")
                }
                else{
                    alert("unable to add id")
                }
            }
        } catch (error) {
            console.log(error)
            alert('Not able to book appointment');
        }
    }

    return (
        <>

        <Form>

            <Form.Field>
                <label>Name</label>
                <input
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

<Form.Field>
                <label>Email</label>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Field>

            <Form.Field>
            <label>Gender</label>
            <Button
                content={gender ? gender : 'Select Gender'}
                onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
            />
            {isGenderDropdownOpen && (
                <Dropdown
                    placeholder='Select Gender'
                    selection
                    options={genderOptions}
                    value={gender}
                    onChange={(_, { value }) => {
                        setGender(value);
                        setIsGenderDropdownOpen(false);
                    }}
                />
            )}
        </Form.Field>
            </Form.Field>

            <Form.Field>
                <label>Age</label>
                <input
                    placeholder='Age'
                    type='number'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </Form.Field>

            <Form.Field>
                <label>Description</label>
                <input
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Field>


            
            <Form.Field>
                <label>Day</label>
                <Button
                    content={day ? day : 'Select a day'}
                    onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                />
                {isDayDropdownOpen && (
                    <Dropdown
                        placeholder='Select a day'
                        selection
                        options={daysOptions}
                        value={day}
                        onChange={(_, { value }) => {
                            setDay(value);
                            setIsDayDropdownOpen(false);
                        }}
                    />
                )}
            </Form.Field>

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
{/* 
            <Form.Field>
                <label>Time</label>
                <Button
                    content={time ? `${time.toString().padStart(2, '0')}:00` : 'Select a time'}
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                />
                {isTimeDropdownOpen && (
                    <Dropdown
                        placeholder='Select a time'
                        selection
                        options={timeOptions}
                        value={time}
                        onChange={(_, { value }) => {
                            setTime(value);
                            setIsTimeDropdownOpen(false);
                        }}
                    />
                )}
            </Form.Field> */}


            {/* ... other form fields ... */}

            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
        </>
    );
}

export default AppointmentForm;
