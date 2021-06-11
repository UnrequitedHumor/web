import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  editableCard: {
    padding: theme.spacing(2),
    flex: "1",
    backgroundColor: purple[100],
    "&:focus": {
      backgroundColor: purple[200]
    }
  },
  editableCardText: {
    width: "100%",
    resize: "none",
    border: "none",
    outline: "none",
    minHeight: "100px",
    backgroundColor: "transparent",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    scrollbarWidth: "thin",
    scrollbarColor: purple[400] + " lightgrey",
    "&::-webkit-scrollbar": {
      width: "0.5em",
      cursor: "pointer"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "lightgrey"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: purple[400]
    }
  }
}));

function EditableCard(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.editableCard}>
      <textarea className={classes.editableCardText}>
        {props.value}
      </textarea>
    </Paper>
  );
}

export default EditableCard;