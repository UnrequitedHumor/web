import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import {Link as RouterLink} from 'react-router-dom';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
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

function MainPage(props) {
  const classes = useStyles();

  let user = props.user;

  return (
    <React.Fragment>
      <Typography className={classes.sectionHeading}>Account</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div className={classes.profileHeading}>
            <Avatar className={classes.profileIcon}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
            <div className={classes.profileText}>
              <Typography className={clsx(classes.accordionHeading, classes.bold)}>Profile</Typography>
              <Typography className={classes.accordionHeading}>You are signed in as {user.email}</Typography>
            </div>
          </div>
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
          <Typography className={classes.accordionHeading}>Card Packs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You haven't created any card packs yet. <Link to="/create-pack" component={RouterLink} color="secondary">Create a new pack</Link>.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}

export default MainPage;