import React from 'react';
import { makeStyles } from "@material-ui/core";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  border: {
    borderBottom: "2px solid " + grey[300],
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
    fontSize: 14,
    color: grey[400]
  }
}));

const DividerWithText = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>{children}</span>
      <div className={classes.border} />
    </div>
  );
};

export default DividerWithText;