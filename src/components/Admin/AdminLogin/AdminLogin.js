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
  MediaQuery,
  SegmentedControl,
} from "@mantine/core";
// import logo from "../../assets/logo4.png";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";


import axios from "axios";

export function AdminLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedinUser, setloggedinUser] = useState(false);

  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

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

  // const HandleLogin = async (e) => {
  //   e.preventDefault();
  //   //send axios post request to server

  //   let loginPromise = userLogin(email, password);
  //   toast.promise(loginPromise, {
  //     loading: t("toast.checking"),
  //     success: t("toast.login"),
  //     error: t("toast.error"),
  //   });

  //   loginPromise
  //     .then((res) => {
  //       let { token } = res?.data;
  //       localStorage.setItem("token", token);
  //       console.log(res);
  //       navigate("/dashboard");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(username==='admin' && password==='admin'){
          localStorage.setItem("admintoken", 'admin');
          navigate("/AdminViewUsers", { replace: true });

    }
    else{
      toast.error("Invalid credentials");
    }

    // try {
    //     const response = await axios.post(
    //         "http://localhost:8800/users/loginuser",
    //         { username, password }
    //     );

    //     if (response.status === 200) {
    //         let { token } = response?.data;
    //         localStorage.setItem("token", token);
    //         console.log('Successful login');
    //         toast.success("Logged in successfully")
    //         navigate("/appointmentform", { replace: true });
            
    //         setloggedinUser(true);
            
    //     } 
    // } catch (error) {
    //     console.error(error);
    //     alert('An error occurred while logging in.');
    // }
};
  const large = useMediaQuery("(min-width: 1800px)");
  const mobile = useMediaQuery("(max-width: 768px)");
  const small = useMediaQuery("(max-width: 480px)");
  const useStyles = createStyles((theme) => ({
    form: {
      backgroundImage:
        "url(https://res.cloudinary.com/djlewzcd5/image/upload/v1687952425/magicpattern-confetti-1687952418601_x0r8g4.png)",

      paddingTop: mobile ? "0rem" : "4rem",
      paddingBottom: mobile ? "0rem" : "4rem",
      height: "100vh",
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
      flexDirection: mobile ? "column" : "row", // Added
    },

    title: {
      color: "linear-gradient(to right, #001510, #00bf8f)",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,

      maxWidth: rem(500),
      fontSize: mobile ? rem(27) : rem(34),
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
      paddingTop: mobile ? "20px" : "60px",
      paddingBottom: mobile ? "20px" : "60px",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      height: small ? "87vh" : mobile ? "94vh" : "100vh",

      background:
        "linear-gradient(to top, #001510, #00bf8f)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },
  }));
  const { classes } = useStyles();
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

                padding: small ? "30px" : mobile ? "60px" : "75px",
                paddingTop: "60px",
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
                mb={50}
              >
                {t("Admin Login")}
              </Title>

              <TextInput
                radius="xl"
                label={t("Username")}
                placeholder="admin"
                size={mobile ? "sm" : "md"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <PasswordInput
                size={mobile ? "sm" : "md"}
                radius="xl"
                label={t("Password")}
                placeholder="Your password"
                mt="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                radius="xl"
                color="cyan"
                className={classes.btn}
                fullWidth
                mt="xl"
                size={mobile ? "sm" : "md"}
                onClick={handleSubmit}
                disabled={username == "" || password == ""}
              >
                {t("Login")}
              </Button>

   
            </Container>
          </Paper>
        </Grid.Col>
        <Grid.Col span={mobile ? 12 : 6}>
          <div className={classes.container}>
            {/* <Image mt="md" maw={large ? 200 : small ? 100 : 150} src={} /> */}
            <Image
              maw={large ? 600 : small ? 200 : 350}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1687949997/Mobile_login-cuate_ubiczk.png"
            />
            <Title order={small ? 4 : mobile ? 3 : 2} color="white" mt="md">
              {t("VMD Medical Community Login")}
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
