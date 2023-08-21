import React, { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import jwt_decode from "jwt-decode";
import axios from "axios";
import TextField from '@mui/material/TextField';


import {
  Divider,
  Flex,
  Group,
  Space,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Container,
  SegmentedControl,
  Select,
  Button,
  Avatar,
  Input,
} from "@mantine/core";
import { CirclePlus } from "tabler-icons-react";
import { FileInput } from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import { useMediaQuery } from "@mantine/hooks";

import { useTranslation } from "react-i18next";
import { IconChevronDown } from "@tabler/icons-react";
import { UserHeader } from "../UserHeader/UserHeader";


export const AppointmentForm2 = () => {
  const { t } = useTranslation();

  const [lock,setLock] = useState(false)


  const [nationalities, setNationalities] = useState([""]);

  const [document, setDocument] = useState(null); //Id , Passport
  const [documentNumber, setDocumentNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [NIFpresent, setNIFPresent] = useState(false);
  const [NIF, setNIF] = useState("");
  const mobile = useMediaQuery("(max-width: 768px)");
  const small = useMediaQuery("(max-width: 480px)");


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


  const inputStyles = createStyles((theme) => ({
    icon: {
      color: theme.colors.gray[7],
      backgroundColor: theme.colors.gray[2],
    },
    root: {
      position: "relative",
    },

    input: {
      width: "100%",
      height: rem(40),
      paddingTop: rem(20),

      marginBottom: "2rem",
    },

    label: {
      fontWeight: 400,
      position: "absolute",
      pointerEvents: "none",
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: `calc(${theme.spacing.xs} / 2)`,
      zIndex: 1,
    },
    innerContainer: {
      padding: small ? "0.5rem" : mobile ? "1rem" : "2rem",
      maxWidth: "100%",
      paddingLeft: small ? 0 : mobile ? "1rem" : "2rem",
      borderRadius: "20px",
      marginTop: "15px",
      boxShadow: small
        ? "none"
        : "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15)",
    },
    mainContainer: {
      padding: small ? "0.5rem" : mobile ? "1rem" : "2rem",

      maxWidth: mobile ? "100%" : "90%",
      borderRadius: "20px",
      marginTop: "15px",
    },

    innerestContainer: {
      marginTop: "15px",
    },
  }));
  const { classes } = inputStyles();


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

  const handleGenderChange = (selectedValue) => {
    setGender(selectedValue);
  };




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
            { email, name, gender, age, description, time, day, bookedby:decodedEmail }
        );

        console.log("this is booked by : "+decodedEmail)

        if (response.data) {
            console.log(response.data.id)
            let appointmentId = response.data.id;

            console.log("this is app id" + appointmentId);
            const response1 = await axios.post(
                "http://localhost:8800/users/addIdInUser",
                { decodedEmail, appointmentId }
            );
            if(response1.data){
              toast.success("Appointment Booked Successfully")
            }
            else{
                toast.error("unable to book you appointment")
            }
        }
    } catch (error) {
        console.log(error)
        alert('Not able to book appointment');
    }
}







  return (
    <>
                <UserHeader></UserHeader>
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div  className={classes.mainContainer}>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
        <Group position="apart">
          <div>
            <Title color="#0E8388" order={4}>
              {t("Book Appointment")}
            </Title>

            {
              lock ?
              <Text c="red"  fz={"xs"}>
                  {t("Please provide information of the patient")}
           
              </Text>
              :
<Text c="dimmed" fz={"sm"}>
              {t("Please provide information of the patient")}
              {/* Please fill your contact details carefully */}
            </Text>
            }
            
          
          </div>

          {!small && (
            <Button
              size={mobile ? "xs" : "sm"}
              style={{
                backgroundColor: "teal",
                borderRadius: mobile ? "10px" : "20px",
              }}
              onClick={handleSubmit}
            >
              {t("Book")}
              {/* save */}
            </Button>
          )}
        </Group>
        <div className={classes.innerContainer} radius="xl" bg="#FBFBFB">

          {/* <Group position="center" spacing="md" grow> */}
          <Flex
            style={{ width: "100%" }}
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 0, sm: "md" }}
          >
            <TextInput
             disabled={lock}
              style={{ width: "100%" }}
              label={t("Name")}
              classNames={classes}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
             disabled={lock}
              style={{ width: "100%" }}
              label={t("Email")}
              classNames={classes}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          {/* </Group> */}
          <Flex
            style={{ width: "100%" }}
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 0, sm: "md" }}
          >
            <TextInput
             disabled={lock}
             type="Number"
              style={{ width: "50%" }}
              label={t("Age")}
              classNames={classes}
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

<Select
style={{ width: "50%", height:"100%" }}
classNames={classes}
  mb="2rem"
  label={day ? day : 'Select a day'}
  value={day} // Set the selected day value
  onChange={setDay} // Provide the onChange handler to update the selected day
  data={daysOptions}
/>

<TextField
            autoFocus            

            margin="dense"
            label=""
            type="time"
            fullWidth
            variant="standard"
            value={time}
             onChange={handleTimeChange}
          />


          </Flex>

          <Flex
            style={{ width: "100%" }}
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 0, sm: "md" }}
          >
            {/* <Select
               disabled={lock}
              style={{ width: "100%" }}
              fw={400}
              popoverProps={{ withinPortal: true }}
              label={t("Day")}
              clearable={false}
              required
              value={day}
              onChange={(day) => {
                console.log(day);
                setDay(day);
              }}
            /> */}
    <Flex style={{ width: '100%', marginTop: '-2rem' }} direction="column">
      <Text fw={400} fz="sm">
        {t('Select Gender')}
      </Text>
      <SegmentedControl
        disabled={lock}
        style={{ width: '100%' }}
        data={[
          {
            label: t('Male'),
            value: 'Male', // Use plain string value for comparison
          },
          {
            label: t('Female'),
            value: 'Female', // Use plain string value for comparison
          },
        ]}
        onChange={(selectedValue) => handleGenderChange(selectedValue)}
      />
    </Flex>
          </Flex>

        </div>
      </div>

    </>
  );
};

export default AppointmentForm2;
