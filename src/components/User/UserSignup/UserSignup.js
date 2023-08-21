import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../UserLogin/UserLogin.css'

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                "http://localhost:8800/users/registeruser",
                { email, password, gender, age }
            );

            if (response.data) {
                alert('User successfully registered!');
            } 
        } catch (error) {

            if(error.response && error.response.status === 400)
            {
                alert('User with this email already exists');
            }

            else{
                console.error(error);
                alert('An error occurred while registering.');

            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="text-center m-5-auto">
                <h2>VMD Medical Community Login</h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Email address</label><br />
                        <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    </p>
                    <p>
                        <label>Age</label><br />
                        <input type="number" name="number" required onChange={(e) => setAge(e.target.value)} />
                    </p>
                    <p>
                        <label>Password</label>
                        <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                        <br />
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                    </p>
                    <p>
                        <label>Gender</label><br />
                        <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                        </select>
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Signup</button>
                    </p>
                </form>
                {/* Rest of your footer */}
            </div>
        </div>
    );
}
