import React, {useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, AppBar, Button, CircularProgress, Container, makeStyles, SvgIcon, Toolbar, Typography} from "@material-ui/core";
import {ReactComponent as AppLogo} from './logo_solid.svg';
import {ExitToApp, ExpandMore} from "@material-ui/icons";
import {useHistory} from "react-router";
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
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, "auto")
  }
}));

function MainPage() {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = React.useState({
    user: null
  });

  useEffect(() => {
    if (!values.user) {
      axios.get("/api/user").then((res) => {
        let data = res.data;
        let loggedIn = data.loggedIn;
        console.info("User:", loggedIn);
        if (!loggedIn) {
          history.push("/login");
          return;
        }

        setValues({...values, user: data.user});
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
            values.user && (<Button endIcon={<ExitToApp />} onClick={() => history.push("/logout")}>Log out</Button>)
          }
        </Toolbar>
      </AppBar>
      {
        values.user ? (
          <Container className={classes.wrapper}>
            <Typography className={classes.sectionHeading}>Account</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.accordionHeading}>Profile</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Here is your profile info. Update it if you wish
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.accordionHeading}>Statistics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Here are your statistics
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Typography className={classes.sectionHeading}>Content</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.accordionHeading}>Games</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  This is the are where you can view your games!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.accordionHeading}>Card Packs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  This is the are where you can view your games!
                </Typography>
              </AccordionDetails>
            </Accordion>
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

export default MainPage;