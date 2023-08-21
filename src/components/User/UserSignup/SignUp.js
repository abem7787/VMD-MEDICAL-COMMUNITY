import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Image,
  Group,
  Flex,
  Grid,
  Container,
  SegmentedControl,
} from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo4.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
export function SignupDone() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const [referalCode, setReferalCode] = useState("");

  const mobile = useMediaQuery("(max-width: 768px)");
  const large = useMediaQuery("(min-width: 1800px)");
  const small = useMediaQuery("(max-width: 480px)");
  const useStyles = createStyles((theme) => ({
    form: {
      backgroundImage:
        "url(https://res.cloudinary.com/djlewzcd5/image/upload/v1687952425/magicpattern-confetti-1687952418601_x0r8g4.png)",

      paddingTop: mobile ? "2rem" : "4rem",
      paddingBottom: mobile ? "2rem" : "4rem",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      backgroundColor: "#F8FAFC",
      // backgroundColor: "red",
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      height: large ? "100vh" : "auto",
      flexDirection: mobile ? "column" : "row", // Added
    },

    title: {
      color: "linear-gradient(to right, #001510, #00bf8f)",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,

      maxWidth: rem(500),
      fontSize: mobile ? rem(30) : rem(34),
      lineHeight: small ? 0.8 : 1.15,
    },
    btn: {
      background:
        "linear-gradient(to right, #001510, #00bf8f)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },
    container: {
      width: mobile ? "100%" : "auto",
      boxSizing: "border-box",
      display: "flex",
      padding: mobile ? "40px" : "60px",
      paddingTop: mobile ? "20px" : "150px",
      paddingBottom: mobile ? "40px" : "80px",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      height: large ? "100vh" : small ? "69vh" : "100%",

      background:
        "linear-gradient(to top, #001510, #00bf8f)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },
  }));
  const { classes } = useStyles();

  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n?.language);

  const changeLang = (lang) => {
    setLang(lang);
    console.log("in change");

    try {
      if (lang) {
        i18n?.changeLanguage(lang);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(
            "http://localhost:8800/users/registeruser",
            { email, password }
        );

        if (response.data) {
          toast.success("User successfully registered!")
          navigate("/userlogin", { replace: true });


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

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    if (value === "") {
      setUsernameError("");
    }

    if (!value.match(/^[A-Za-z0-9]{5,50}$/)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (value === "") {
      setEmailError("");
    }

    if (
      !value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value === "") {
      setPasswordError("");
    }

    if (!value.match(/^[\w!@#$%^&*()\-+={}\[\]|\\:;"'<>,.?\/]{6,}$/)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <>
      {/* <SegmentedControl
        color="teal"
        style={{
          position: "fixed",
          top: 0,
          zIndex:500,
          left: 0,
        }}
        value={lang}
        onChange={(value) => changeLang(value)}
        data={[
          { label: "En", value: "en" },
          { label: "Fr", value: "fr" },
        ]}
      /> */}
      <Toaster position="top-center"></Toaster>
      <Grid gutter={0}>
        <Grid.Col span={mobile ? 12 : 6}>
          <Paper className={classes.form} radius={0}>
            <Container
              style={{
                boxSizing: "border-box",

                padding: small ? "35px" : mobile ? "65px" : "90px",
                paddingTop: "10px",
                paddingBottom: "60px",
                backgroundColor: "#F8FAFC",
                boxShadow:
                  "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15)",
              }}
            >
              <Title
                style={{ maxWidth: "350px" }}
                className={classes.title}
                ta="center"
                mt="md"
                mb={30}
              >
                {t("Greetings!")}
              </Title>

  
              <TextInput
                required
                mt="md"
                radius="xl"
                label={t("Email Address")}
                size={mobile ? "sm" : "md"}
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />

              <PasswordInput
                radius="xl"
                label={t("Password")}
                required
                mt="md"
                size={mobile ? "sm" : "md"}
     
                value={password}
                onChange={handlePasswordChange}
              />


   
              {/* <Checkbox color ="cyan" label="Agree to terms and conditions" mt="xl" size="md" /> */}
              <Button
                radius="xl"
                color="cyan"
                className={classes.btn}
                fullWidth
                mt="xl"
                size={mobile ? "sm" : "md"}
                onClick={handleSubmit}
                disabled={usernameError || PasswordError || emailError}
              >
                {t("Sign Up")}
              </Button>

              <Text ta="center" mt="md">
                {t("Already have an account?")}
                <Button
                  variant=""
                  color="#001510"
                  style={{ fontWeight: 700 }}
                  onClick={() => navigate("/userlogin")}
                >
                  {t("Login")}
                </Button>
              </Text>
            </Container>
          </Paper>
        </Grid.Col>
        <Grid.Col span={mobile ? 12 : 6}>
          <div className={classes.container}>
            {/* <Image mt="md" maw={large ? 200 : small ? 100 : 150} src={logo} /> */}
            <Image
              maw={large ? 600 : small ? 200 : 350}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1687949997/Mobile_login-cuate_ubiczk.png"
            />
            <Title order={small ? 4 : mobile ? 3 : 2} color="white" mt="md">
              {t("VMD Medical Community Signup")}
            </Title>
            <Text mb={15} c="dimmed" color="white" fz={small ? "xs" : "md"}>
              {t("We help you book your appointments at ease")}
            </Text>
            <Text
              color="white"
              mb={15}
              fz={small ? "xs" : mobile ? "sm" : "lg"}
            >
              {/* {t("image.sub")} */}
            </Text>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}
