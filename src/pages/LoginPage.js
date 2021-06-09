import React, {useEffect} from 'react';
import {
  Button,
  Container,
  createMuiTheme,
  IconButton,
  InputAdornment, Link,
  makeStyles,
  MuiThemeProvider, Paper, SvgIcon, TextField,
  Typography
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {useGoogleLogin} from 'react-google-login';
import logo from './logo.svg';
import {ReactComponent as GoogleLogo} from './google_logo.svg';
import clsx from 'clsx';
import {Link as RouterLink} from 'react-router-dom';
import {blue} from '@material-ui/core/colors';
import DividerWithText from './ui/DividerWithText';

const googleClientId = "453835501464-dho2cqor3l58bjqukplg64iviqjjajit.apps.googleusercontent.com";
const apiEndpoint = "http://localhost:3001";

const theme = createMuiTheme({
  typography: {
    fontSize: 14
  }
})

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    minHeight: "100vh",
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
  loginPaper: {
    marginTop: theme.spacing(3),
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3)
  },
  appHeader: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  appLogoWrapper: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
      display: "flex",
      justifyContent: "center"
    }
  },
  appLogo: {
    width: "100px"
  },
  appHeaderText: {
    paddingRight: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
      textAlign: "center"
    }
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
    padding: theme.spacing(1, 1.5),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      padding: theme.spacing(1),
    }
  },
  googleIcon: {
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2)
    }
  },
  invisible: {
    opacity: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  registerText: {
    margin: theme.spacing(2, 0)
  },
  registerLink: {
    textDecoration: "none",
    color: blue[500],
    fontWeight: "bold"
  },
  nameInputs: {
    display: "flex",
    gap: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  nameInput: {
    flex: 1
  }
}));

function LoginPage(props) {
  const isRegistering = props.register;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    showPassword: false,
    emailLoginError: "",
    googleSignInError: "",
    loading: false
  });

  useEffect(() => {
    document.title = "Unrequited Humor | " + (isRegistering ? "Register" : "Login")
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
    fetch(apiEndpoint + "/google-login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        token: res.tokenId
      })
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setValues({...values, googleSignInError: data.error, loading: false});
        return;
      }

      console.info("Login result: ", data);
      setValues({...values, loading: false});
    }).catch((err) => {
      console.error("Login error: ", err);
      setValues({...values, googleSignInError: "An unexpected error occurred. Please try again", loading: false});
    });
  };

  const onGoogleLoginFailure = (res) => {
    let error;
    switch(res.error) {
      case "popup_closed_by_user":
        error = "";
        break;
      default:
        error = res.error;
    }
    console.error("Google login failed: ", res);
    setValues({...values, googleSignInError: error, loading: false});
  };

  const {signIn, loaded} = useGoogleLogin({
    clientId: googleClientId,
    isSignedIn: true,
    cookiePolicy: "single_host_origin",
    onSuccess: onGoogleLoginSuccess,
    onFailure: onGoogleLoginFailure
  });

  if (!loaded) {
    console.info("loading");
  }

  const loginWithEmail = (e) => {
    e.preventDefault();

    setValues({...values, emailLoginError: "", googleSignInError: "", loading: true});

    fetch(apiEndpoint + "/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setValues({...values, emailLoginError: data.error, loading: false});
        return;
      }

      console.info("Login result: ", data);
      setValues({...values, emailLoginError: "", googleSignInError: "", loading: false});
    }).catch((err) => {
      console.error("Login error: ", err);
      setValues({...values, emailLoginError: "An unexpected error occurred. Please try again", loading: false});
    });
  }

  const registerWithEmail = (e) => {
    e.preventDefault();

    setValues({...values, emailLoginError: "", googleSignInError: "", loading: true});

    fetch(apiEndpoint + "/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      })
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setValues({...values, emailLoginError: data.error, loading: false});
        return;
      }

      console.info("Registration result: ", data);
      setValues({...values, emailLoginError: "", googleSignInError: "", loading: false});
    }).catch((err) => {
      console.error("Registration error: ", err);
      setValues({...values, emailLoginError: "An unexpected error occurred. Please try again", loading: false});
    });
  }

  const signInWithGoogle = () => {
    setValues({...values, emailLoginError: "", googleSignInError: "", loading: true});
    signIn();
  }

  let errorMessage = values.emailLoginError || values.googleSignInError;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.pageWrapper}>
        <Container maxWidth="md" className={classes.pageContainer}>
          <Paper elevation={3} className={classes.loginPaper}>
            <form name="login" className={classes.loginForm} onSubmit={isRegistering ? registerWithEmail : loginWithEmail}>
              <div className={classes.appHeader}>
                <div className={classes.appLogoWrapper}>
                  <img src={logo} className={classes.appLogo} alt="logo" />
                </div>
                <div className={classes.appHeaderText}>
                  <Typography variant="h4" component="h1">Unrequited Humor</Typography>
                  <Typography variant="subtitle1" color={errorMessage !== "" ? "error" : "initial"} paragraph>
                    {errorMessage === "" ? "Are you really joking in a time like this?" : errorMessage}
                  </Typography>
                </div>
              </div>
              {
                isRegistering && (
                  <div className={classes.nameInputs}>
                    <TextField
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={values.firstName}
                      label="First Name"
                      variant="outlined"
                      onChange={handleChange("firstName")}
                      fullWidth
                      className={clsx(classes.loginInput, classes.nameInput)}
                      error={values.emailLoginError !== ""}
                      required
                      InputLabelProps={{required: false}}
                    />
                    <TextField
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={values.lastName}
                      label="Last Name"
                      variant="outlined"
                      onChange={handleChange("lastName")}
                      fullWidth
                      className={clsx(classes.loginInput, classes.nameInput)}
                      error={values.emailLoginError !== ""}
                      required
                      InputLabelProps={{required: false}}
                    />
                  </div>
                )
              }
              <TextField
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                label="Email"
                variant="outlined"
                onChange={handleChange("email")}
                className={classes.loginInput}
                error={values.emailLoginError !== ""}
                required
                InputLabelProps={{required: false}}
              />
              <TextField
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                variant="outlined"
                label="Password"
                className={classes.loginInput}
                error={values.emailLoginError !== ""}
                required
                InputLabelProps={{required: false}}
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
              <Button
                variant="contained"
                color="secondary"
                className={clsx(classes.loginButton, classes.mainLoginButton)}
                type="submit"
                disabled={values.loading}
                disableElevation
              >
                {isRegistering ? "Register" : "Login"}
              </Button>
              <DividerWithText>OR</DividerWithText>
              <Button
                variant="contained"
                className={clsx(classes.loginButton, classes.googleLoginButton)}
                onClick={signInWithGoogle}
                disabled={values.loading}
                disableElevation
              >
                <SvgIcon component={GoogleLogo} viewBox="14 14 18 18" className={classes.googleIcon}/>
                <span>Sign in with Google</span>
                <SvgIcon component={GoogleLogo} viewBox="14 14 18 18" className={classes.invisible}/>
              </Button>
            </form>
          </Paper>
          <Typography className={classes.registerText} color="textSecondary" variant="body1">
            {
              isRegistering ? (
                <React.Fragment>
                  Already have an account? <Link component={RouterLink} to="/login">Log in</Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Don't have an account? <Link component={RouterLink} to="/register">Register now</Link>
                </React.Fragment>
              )
            }

          </Typography>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default LoginPage;
