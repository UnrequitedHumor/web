import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserContentWrapper from "./pages/UserContentWrapper";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {green, purple} from "@material-ui/core/colors";
import LogoutPage from "./pages/LogoutPage";
import MainPage from "./pages/MainPage";
import CreatePackPage from "./pages/CreatePackPage";

const theme = createMuiTheme({
  typography: {
    fontSize: 14
  },
  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: purple[300]
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route key="login" path="/login">
            <LoginPage />
          </Route>
          <Route key="register" path="/register">
            <LoginPage register={true} />
          </Route>
          <Route key="logout" path="/logout">
            <LogoutPage />
          </Route>
          <Route key="create-game" path="/create-pack">
            <UserContentWrapper content={<CreatePackPage />} />
          </Route>
          <Route key="main" path="/">
            <UserContentWrapper content={<MainPage />} />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
