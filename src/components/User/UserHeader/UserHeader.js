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
import NotfUser from "../NotfUser/NotfUser";


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

export function UserHeader(props) {
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
  const { classes } = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [open, setOpen] = useState(false)

  const mobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // const response = await getUserData();
    // if (response) {
    //   const tempUsername = response?.username;
    //   setUsername(
    //     tempUsername?.charAt(0).toUpperCase() + tempUsername.slice(1)
    //   );

    //   setEmail(response?.email);
    //   setPhoto(response?.profilePhoto);
    //   console.log(response);
    // }
  };

  const logout =async() =>{
    localStorage.removeItem("token");
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
              <Button
            style={{color:'white' }}
            onClick={() => {
              // Step 2: Toggle notification component visibility
              setShowNotifications(!showNotifications);
              setOpen(true);
            }}
          >
            {t("Notifications")}
          </Button>
              

<Link to='/userviewappointments'>
              <Button style={{color:'white' }}>
                {t("Appointments")}
              </Button>
              </Link>
              <Button style={{color:'white' }}
                onClick={() => {
                  logout();
            
                  navigate("/");
                }}
              >
                {t("Log out")}
              </Button>
          
            </Group>
          </Flex>
        </div>
      </Header>
    </Paper>
    {showNotifications && <NotfUser open={open} setOpen={setOpen} />}

    </div>

  );
}
