import React from "react";
import {
  Button,
  Card, CardActions, CardContent, FormControl,
  IconButton, InputLabel,
  makeStyles, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField,
  Typography
} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import EditableCard from "./ui/EditableCard";

const STEPS = ["Choose a game", "Configure your pack", "Add cards"];

const GAMES = [
  {
    id: "most-likely",
    name: "Most Likely To",
    desc: `Players take turns reading 'most likely to' questions and voting on the player that they think best matches the card. The player who asked the question has to choose the answer that they think fits best.`
  },
  {
    id: "truth-or-dare",
    name: "Truth of Dare?",
    desc: "Players take turns choosing between drawing a 'Truth' or a 'Dare' card. 'Truth' cards require a player to divulge a secret, whilst 'Dare' cards include a challenge that they must immediately complete."
  },
  {
    id: "would-you-rather",
    name: "Would you Rather?",
    desc: "Players take turns reading 'would you rather' questions, and everybody has to guess which option they would prefer. Players who guess correctly get a point."
  },
  {
    id: "fill-in-the-blank",
    name: "Fill in the Blank",
    desc: "A player draws a 'Prompt' card containing a prompt with one or more missing words. Everybody else is given seven 'Blanks' cards, and they must create the funniest sentence possible by replacing the blank(s) with their own cards. The player who drew the 'Prompt' card then chooses their favorite response."
  },
  {
    id: "reviews",
    name: "Reviewed",
    desc: "A player draws a 'Place' card, and everybody else is given seven 'Review' cards to pick from. Everybody submits a review for the place, and the player who drew the place card must choose the funniest review"
  },
  {
    id: "response-deduction",
    name: "Response Deduction",
    desc: "A player draws a 'Prompt' card, and everybody else must write their own response. Then, the player who drew the prompt must guess who wrote each prompt, as well as picking the answer that they think is funniest."
  },
  {
    id: "object-matching",
    name: "Object Matching",
    desc: "A 'Description' card is drawn, and every player is dealt seven 'Object' cards. The first player to pick an object that matches the description in some way wins the round."
  },
  {
    id: "secret-objective",
    name: "Secret Objective",
    desc: "Each player is dealt a 'Secret Objective' card containing a task that they must complete or get another player to complete. If they succeed, they get a point, but if a player suspects that they are trying to complete an objective, they loose a point. Incorrectly accusing someone of trying to complete their objective costs the accuser a point, whilst correctly calling someone out wins you a point."
  }
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1, 2)
  },
  paperHeading: {
    display: "flex",
    alignItems: "center"
  },
  paperHeadingIcon: {
    marginRight: theme.spacing(1)
  },
  paperHeadingText: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold"
  },
  gameListing: {
    display: "flex",
    alignItems: "flex-start",
    margin: theme.spacing(1, 0)
  },
  gameRadio: {
    marginRight: theme.spacing(1)
  },
  gameInfo: {
    margin: theme.spacing(2, 0)
  },
  gameHeading: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5)
  },
  gameText: {
    fontSize: theme.typography.pxToRem(15)
  },
  configHeading: {
    fontWeight: "bold",
    margin: theme.spacing(1, 0)
  },
  configInput: {
    margin: theme.spacing(1, 0)
  },
  configButtons: {
    margin: theme.spacing(1, 0),
    display: "flex",
    gap: theme.spacing(1)
  },
  cardsGrid: {
    margin: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
  },
  cardsFlex: {
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  }
}));

function CreatePackPage() {
  const classes = useStyles();
  const history = useHistory();

  const [curStep, setCurStep] = React.useState(0);
  const [selectedGame, setSelectedGame] = React.useState(null);

  const [packName, setPackName] = React.useState("");
  const [packTags, setPackTags] = React.useState([]);
  const [packVisibility, setPackVisibility] = React.useState("public");

  const selectGame = (gameNo) => () => {
    setSelectedGame(gameNo);
    setPackTags([GAMES[gameNo].name]);
    setCurStep(1);
  }

  const savePackSettings = (e) => {
    e.preventDefault();
    setCurStep(2);
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.paperHeading}>
          <IconButton color="primary" aria-label="go back" className={classes.paperHeadingIcon} onClick={() => history.push("/")}>
            <ArrowBack />
          </IconButton>
          <Typography className={classes.paperHeadingText}>Create a new card pack</Typography>
        </div>
        <Stepper alternativeLabel activeStep={curStep} color="secondary">
          {
            STEPS.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))
          }
        </Stepper>
        {
          curStep === 0 && GAMES.map((game, index) => (
            <Card className={classes.gameInfo} key={index} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h3" className={classes.gameHeading}>{game.name}</Typography>
                <Typography className={classes.gameText}>{game.desc}</Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={selectGame(index)}>Use this game</Button>
              </CardActions>
            </Card>
          ))
        }
        {
          curStep === 1 && (
            <form name="pack-configuration" onSubmit={savePackSettings}>
              <Typography className={classes.configHeading}>Pack Settings</Typography>
              <TextField
                label="Name"
                variant="outlined"
                className={classes.configInput}
                color="secondary"
                value={packName}
                onChange={(e) => setPackName(e.target.value)}
                InputLabelProps={{required: false}}
                fullWidth
                required
              />
              <ChipInput
                label="Tags"
                variant="outlined"
                defaultValue={packTags}
                className={classes.configInput}
                color="secondary"
                InputProps={{
                  label: "Tags"
                }}
                onChange={(tags) => setPackTags(tags)}
                fullWidth
              />
              <FormControl className={classes.configInput} variant="outlined" fullWidth>
                <InputLabel id="pack-visibility-select-label">Visibility</InputLabel>
                <Select
                  labelId="pack-visibility-select-label"
                  value={packVisibility}
                  onChange={(e) => setPackVisibility(e.target.value)}
                  label="Visibility"
                  color="secondary"
                  required
                >
                  <MenuItem value="public">Public (Anyone can use)</MenuItem>
                  <MenuItem value="unlisted">Unlisted (Anyone with the link can use)</MenuItem>
                  <MenuItem value="private">Private (Only you can use)</MenuItem>
                </Select>
              </FormControl>
              <div className={classes.configButtons}>
                <Button onClick={() => setCurStep(0)}>Back</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Continue
                </Button>
              </div>
            </form>
          )
        }
        {
          curStep === 2 && (
            <React.Fragment>
              <Typography className={classes.configHeading}>Pack Information</Typography>
              <div className={classes.gameInfo}>
                <Typography>Game: {GAMES[selectedGame].name}</Typography>
                <Typography>Pack name: {packName}</Typography>
                <Typography>Tags: {packTags.join(", ")}</Typography>
                <Typography>Visibility: {packVisibility}</Typography>
              </div>
              <Typography className={classes.configHeading}>White Cards</Typography>
              <div className={classes.cardsGrid}>
                <div className={classes.cardsFlex}>
                  <EditableCard value="Your father." />
                  <EditableCard value="The end of times." />
                </div>
                <div className={classes.cardsFlex}>
                  <EditableCard value="Your father." />
                  <EditableCard value="The end of times." />
                </div>
                <div className={classes.cardsFlex}>
                  <EditableCard value="Your father." />
                  <EditableCard value="The end of times." />
                </div>
                <div className={classes.cardsFlex}>
                  <EditableCard value="Your father." />
                  <EditableCard value="The end of times." />
                </div>
              </div>
              <div className={classes.configButtons}>
                <Button onClick={() => setCurStep(1)}>Back</Button>
                <Button variant="contained" color="primary" disableElevation>
                  Finish
                </Button>
              </div>
            </React.Fragment>
          )
        }
      </Paper>
    </React.Fragment>
  );
}

export default CreatePackPage;