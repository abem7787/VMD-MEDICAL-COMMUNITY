import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Button = styled.button`
  padding: 10px;
  color:30px;
  cursor: pointer;
  font-weight: 200;
  border: none;
  border-radius:240px;

`;



const NavBar = () => {
  return (
    <div className="Container">
      <div className="Wrapper">
        <div className="Left">VMD Medical Community </div>     
        <div className="Right">
          <Link to={`/adminlogin/`}>
            <Button>Admin login</Button>
          </Link>


          <Link to={`/userviewappointments`}>
            <Button>View Appointments</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
