import React, { useEffect } from "react";
import { Typography, AppBar, Toolbar, Grid, ListItem } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, BrowserRouter as Router, Link, Route, Routes, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import useStyles from "utils/styles";
import Info from "components/pages/info/Info";
import NavLink from "components/common/NavLink";
import { Page } from "components/common/Page";
import Leagues from "components/pages/leagues/Leagues";
import Race from "components/pages/race/Race";
import NewLeagueForm from "components/pages/leagues/NewLeagueForm";
import League from "components/pages/league/League";
import { AccountCircleOutlined, AccountCircle, HelpOutlineOutlined } from "@material-ui/icons";
import Profile from "components/pages/profile/Profile";
import ErrorBoundary from "components/pages/error/ErrorBoundary";
import Login from "components/pages/auth/Login";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { RequireAuth } from "components/pages/auth/RequireAuth";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "#ff6737",
      // main: "#ff2800",
      main: "#e10600",
      dark: "#c30000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

// necessary to keep App in a separate component for the theme to be rendered correctly
function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function Title() {
  const classes = useStyles();

  return (
    <Link to="/" className={classes.title}>
      F1 Pick 'Em
    </Link>
  );
}

function TopBar() {
  const classes = useStyles();
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const isAuthenticated = (authStatus === "authenticated");

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <NavLink to="/profile" icon={isAuthenticated ? <AccountCircle /> : <AccountCircleOutlined />} />
          </Grid>
          <Grid item>
            <Title />
          </Grid>
          <Grid item>
            <NavLink to="/info" icon={<HelpOutlineOutlined />} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

function App() {
  const classes = useStyles();

  // resets the page view to the top when rendering new routes
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Authenticator.Provider>
      <TopBar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Leagues />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path="/leagues" element={
            <RequireAuth>
              <Leagues />
            </RequireAuth>
          } />
          <Route path="/leagues/new" element={
            <RequireAuth>
              <NewLeagueForm />
            </RequireAuth>
          } />
          <Route path="/leagues/:id" element={
            <RequireAuth>
              <League />
            </RequireAuth>
          } />
          <Route path="/leagues/:leagueId/races/:raceId" element={
            <RequireAuth>
              <Race />
            </RequireAuth>
          } />
        </Routes>
      </ErrorBoundary>
    </Authenticator.Provider>
  );
}

export default ThemedApp;
