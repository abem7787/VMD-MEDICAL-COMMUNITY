import {
  createStyles,
  Header,
  Container,
  rem,
  Paper,
  Avatar,
  Flex,
  Group,
  Text,
  Menu,
  Center,
  Image,
  SegmentedControl,
} from "@mantine/core";
import React from "react";
import Button from '@mui/material/Button';
import { ChevronDown } from "tabler-icons-react";
// import logo from "../../assets/logo.png";
// import { getUserData, logout } from "../Utility/AuthFunctions";
import { useMediaQuery } from "@mantine/hooks";
import { Menu2 } from "tabler-icons-react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HEADER_HEIGHT = rem(55);

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
    backgroundColor: "teal", // Change this line

  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function GenericHeader(props) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n?.language);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status


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
  const { classes } = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const mobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    // Check if "token" exists in local storage
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Update login status based on token existence
  };


  const logout =async() =>{
    localStorage.removeItem("token");
    setLoggedIn(false); // Update login status to false after logout

  }
  
  return (
    <div style={{ marginBottom: '70px' }}>

    <Paper  shadow="sm">
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <div style={{ marginRight: mobile ? "10px" : "40px", height: "100%" }}>
          <Flex
            px="xl"
            justify="space-between"
            align="center"
            style={{ height: "100%" }}
          >
            <Group>
              <Menu2
                onClick={() => props.onSet(!props.viewSidebar)}
                style={{ display: mobile ? "block" : "none" }}
                size="1.3rem"
                strokeWidth={2}
              />
              {/* <Image style={{ width: mobile ? "60px" : "90px" }} src={logo} /> */}
              <Text style={{ fontWeight: "bold", color:'white' }}>VMD MEDICAL COMMUNITY</Text>

            </Group>

            <Group>

              <Group style={{ display: mobile ? "none" : "" }} mr="xl">
                <div>
                  <Text color="#0E8388" fw={500}>
                    {username}
                  </Text>
                  <Text fz="xs" c="dimmed" fw={400}>
                    {email}
                  </Text>
                </div>

              </Group>

<Link to="/adminlogin">
              <Button style={{ color: "white" }}>
                    {t("Admin Login")}
                  </Button>
                  </Link>

              {loggedIn ? ( // Conditionally render Logout or Login button
                <>
                  <Button style={{ color: "white" }} onClick={logout}>
                    {t("Log out")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/userlogin">
                    <Button style={{ color: "white" }}>{t("Login")}</Button>
                  </Link>
                </>
              )}
          
            </Group>
          </Flex>
        </div>
      </Header>
    </Paper>
    </div>

  );
}
