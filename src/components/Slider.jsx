import { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {Text} from "@mantine/core";


const Container = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`

  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw; /* Cover the full width of the viewport */
  height: 100vh; /* Cover the full height of the viewport */
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  background-size: cover; /* Add this line to make the image cover the background */
  background-position: center; /* Add this line to center the image within the background */
`;

const ImgContainer = styled.div`
  height: 100%; /* Change height to cover the full height of the Slide */
  flex: 1;
`;

const Image = styled.img`
  height: 100%; /* Change height to cover the full height of the ImgContainer */
  width: 100%; /* Add this line to ensure the image covers the container width */
  object-fit: cover; /* Add this line to maintain aspect ratio and cover the container */
`;

const InfoContainer = styled.div`
display: flex;
flex-Direction: column;
  flex: 1;
  padding: 10px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  display: flex;
flex-Direction: column;
align-items: center;
justify-content: center;
`;

const Desc = styled.p`
text-align: center;

  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;


const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <div style={{width:'70%', marginTop:'20px', marginBottom:'20px'}}>
              <Text style={{textAlign:'center', margin:'50 0', fontSize:'20px', fontWeight:'200'}}>{item.desc}</Text>
              
              </div>
              <Link to={`/appointmentform/`}>
                <Button style={{backgroundColor:'teal'}} variant="contained">Make an Appointment</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
