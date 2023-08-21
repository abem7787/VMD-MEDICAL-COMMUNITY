import "./App.css";
import Home from "./components/Home";
import React from "react";
import Lists from "./components/Lists";
import Edit from "./components/Edit";
import  Register from "./components/Register";

import { Routes, Route, BrowserRouter} from "react-router-dom";
import UserLogin from "./components/User/UserLogin/UserLogin";
import UserSignup from "./components/User/UserSignup/UserSignup";
import AppointmentForm from "./components/User/AppointmentForm/AppointmentForm";
import UserViewAppointments from "./components/User/UserViewAppointments/UserViewAppointments";
import { UserAuthorizer } from "./components/User/UserAuthorizer/UserAuthorizer";
import { Login } from "./components/User/UserLogin/Login";
import { SignupDone } from "./components/User/UserSignup/SignUp";
import { AdminLogin } from "./components/Admin/AdminLogin/AdminLogin";
import AdminViewUsers from "./components/Admin/ViewUsers/AdminViewUsers";
import AppointmentForm2 from "./components/User/AppointmentForm/AppointmentForm2";
import { AdminAuthorizer } from "./components/Admin/AdminAuthorizer/AdminAuthorizer";
import { UserHeader } from "./components/User/UserHeader/UserHeader";



const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          
          <Route path="/list" element={<Lists/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adminlogin" element={ <AdminLogin/>} />
          <Route path="/UserLogin" element={ <Login/>} />
          <Route path="/usersignup" element={<SignupDone/>} />
          <Route path="/appointmentform" element={<UserAuthorizer><AppointmentForm2/></UserAuthorizer>}/>
          <Route path="/userviewappointments" element={<UserAuthorizer> <UserViewAppointments/> </UserAuthorizer> } />
          <Route path="/usersignup1" element={<UserSignup/>} />
          <Route path="/AdminViewUsers" element={<AdminAuthorizer><AdminViewUsers/></AdminAuthorizer>} />
          <Route path="/userheader" element={<UserHeader></UserHeader>} />

          


          


          {/* <Route path="/appointmentform" element={<AppointmentForm/>} /> */}
          <Route path="list/user/:id/edit" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

