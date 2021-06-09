import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {CircularProgress, Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh"
  },
  spinner: {
    margin: theme.spacing(2, 0)
  }
}));

function LogoutPage() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios.post("/api/logout").finally(() => {
      console.info("Logged out!");
      history.push("/login");
    });
  });

  return (
    <Container className={classes.wrapper}>
      <Typography variant="h4" component="h1">Logging out...</Typography>
      <CircularProgress color="secondary" className={classes.spinner}/>
    </Container>
  );
}

export default LogoutPage;