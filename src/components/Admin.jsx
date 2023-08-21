import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(""https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const ButtonBlue = styled.button`
  padding: 10px;
  background-color: blue;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;
const ButtonGreen = styled.button`
  padding: 10px;
  background-color: green;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;
const AdminLogin = () => {

 

  return (
    <Container>
      <Link to={`/list/`}>
        <ButtonBlue>Review</ButtonBlue>
      </Link>
      <Link to={`/edit/`}>
        <ButtonGreen>Edit</ButtonGreen>
      </Link>
    </Container>
  );
};

export default AdminLogin;
