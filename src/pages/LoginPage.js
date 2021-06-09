import React from 'react';
import {
  Button,
  Container,
  createMuiTheme, Divider,
  IconButton,
  InputAdornment,
  makeStyles,
  MuiThemeProvider, Paper, SvgIcon, TextField,
  Typography
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {useGoogleLogin} from 'react-google-login';
import {ReactComponent as GoogleLogo} from './google_logo.svg';
import clsx from "clsx";
import {Link} from "react-router-dom";
import {blue} from "@material-ui/core/colors";
import DividerWithText from "./ui/DividerWithText";

const googleClientId = "453835501464-dho2cqor3l58bjqukplg64iviqjjajit.apps.googleusercontent.com";

const theme = createMuiTheme({
  typography: {
    fontSize: 14
  }
})

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "columnn"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: "1"
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3)
  },
  loginInput: {
    margin: theme.spacing(1, 0)
  },
  loginButton: {
    textTransform: "none",
    padding: theme.spacing(1)
  },
  mainLoginButton: {
    marginTop: theme.spacing(2)
  },
  googleLoginButton: {
    justifyContent: "space-between",
    padding: theme.spacing(1, 1.5)
  },
  invisible: {
    opacity: 0
  },
  registerText: {
    paddingTop: theme.spacing(2)
  },
  registerLink: {
    textDecoration: "none",
    color: blue[500],
    fontWeight: "bold"
  }
}));

function LoginPage() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onGoogleLoginSuccess = (res) => {
    console.log("Google login succeeded: ", res);
  };

  const onGoogleLoginFailure = (res) => {
    console.error("Google login failed: ", res);
  };

  const {signIn, loaded} = useGoogleLogin({
    clientId: googleClientId,
    isSignedIn: true,
    cookiePolicy: "single_host_origin",
    onSuccess: onGoogleLoginSuccess,
    onFailure: onGoogleLoginFailure
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.pageWrapper}>
        <Container maxWidth="md" className={classes.pageContainer}>
          <Paper elevation={3}>
            <form name="login" method="post" className={classes.loginForm}>
              <Typography variant="h3" component="h1">Unrequited Humor</Typography>
              <Typography variant="subtitle1" paragraph>Are you really joking in a time like this?</Typography>
              <TextField
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                label="Email"
                variant="outlined"
                onChange={handleChange("email")}
                fullWidth
                className={classes.loginInput}
              />
              <TextField
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                variant="outlined"
                label="Password"
                fullWidth
                className={classes.loginInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button variant="contained" color="primary" className={clsx(classes.loginButton, classes.mainLoginButton)}>Login</Button>
              <DividerWithText>OR</DividerWithText>
              <Button variant="contained" className={clsx(classes.loginButton, classes.googleLoginButton)} onClick={signIn}>
                <SvgIcon component={GoogleLogo} viewBox="14 14 18 18"/>
                <span>Sign in with Google</span>
                <SvgIcon component={GoogleLogo} viewBox="14 14 18 18" className={classes.invisible}/>
              </Button>
            </form>
          </Paper>
          <Typography className={classes.registerText} color="textSecondary" variant="body1">Don't have an account? <Link to="/register" className={classes.registerLink}>Register
            now</Link></Typography>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default LoginPage;
