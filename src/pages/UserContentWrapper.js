import React, {useEffect} from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  SvgIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import {ReactComponent as AppLogo} from './logo_solid.svg';
import {ExitToApp} from "@material-ui/icons";
import {useHistory} from 'react-router-dom';
import clsx from "clsx";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.down(350)]: {
      padding: theme.spacing(0.5, 0)
    }
  },
  appIcon: {
    marginRight: theme.spacing(2),
  },
  appBarTitle: {
    flexGrow: 1
  },
  wrapper: {
    margin: theme.spacing(3, "auto"),
    width: "800px",
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
  },
  sectionHeading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 1),
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15)
  },
  bold: {
    fontWeight: "bold"
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, "auto")
  },
  profileHeading: {
    display: "flex"
  },
  profileIcon: {
    marginRight: theme.spacing(2)
  },
  profileText: {

  }
}));

function UserContentWrapper(props) {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = React.useState( null);

  useEffect(() => {
    if (!user) {
      axios.get("/api/user").then((res) => {
        let data = res.data;
        let loggedIn = data.loggedIn;

        if (!loggedIn) {
          history.push("/login");
          return;
        }

        setUser(data.user);
      }).catch((err) => {
        console.error("Get user error: ", err);
      });
    }
  });

  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appBar} color="primary">
        <Toolbar>
          <SvgIcon component={AppLogo} viewBox="0 0 529.52 434.17" className={classes.appIcon}/>
          <Typography variant="h6" component="h1" className={classes.appBarTitle}>Unrequited Humor</Typography>
          {
            user && (<Button endIcon={<ExitToApp />} onClick={() => history.push("/logout")}>Log out</Button>)
          }
        </Toolbar>
      </AppBar>
      {
        user ? (
          <Container className={classes.wrapper}>
            {React.cloneElement(props.content, {user: user})}
          </Container>
        ) : (
          <Container className={clsx(classes.wrapper, classes.centered)}>
            <CircularProgress color="secondary" />
          </Container>
        )
      }

    </React.Fragment>
  );
}

export default UserContentWrapper;