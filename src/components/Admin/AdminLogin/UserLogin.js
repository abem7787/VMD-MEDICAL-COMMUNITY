import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import '../UserLogin/UserLogin.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { Button } from '@material-ui/core';
import UserViewAppointments from '../UserViewAppointments/UserViewAppointments';
import { Link } from 'react-router-dom';



export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedinUser, setloggedinUser] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8800/users/loginuser",
                { email, password }
            );

            if (response.status === 200) {
                let { token } = response?.data;
                localStorage.setItem("token", token);
                console.log('Successful login');
                setloggedinUser(true);
                
            } 
        } catch (error) {
            console.error(error);
            alert('An error occurred while logging in.');
        }
    };

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="text-center m-5-auto">
                <h2>VMD Medical Community Login</h2>
                {loggedinUser && <Link to={`/userviewappointments?email=${email}`}>
                    <Button>View Appointments</Button>
                </Link>}

               {!loggedinUser && <form onSubmit={handleSubmit}>
                    {/* Your form fields */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>}
                {loggedinUser && <AppointmentForm email1={email} />}
                {/* Rest of your footer */}
            </div>
        </div>
    );
}
