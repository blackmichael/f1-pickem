import React, { useEffect } from "react";
import { Typography, AppBar, Toolbar, Grid, ListItem } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import useStyles from "utils/styles";
import Info from "components/pages/info/Info";
import NavLink from "components/common/NavLink";
import { Page } from "components/common/Page";
import Leagues from "components/pages/leagues/Leagues";
import Race from "components/pages/race/Race";
import NewLeagueForm from "components/pages/leagues/NewLeagueForm";
import League from "components/pages/league/League";
import { AccountCircleOutlined, HelpOutlineOutlined } from "@material-ui/icons";
import Profile from "components/pages/profile/Profile";

const theme = createMuiTheme({
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
      <Router>
        <App />
      </Router>
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

  return (
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <NavLink to="/profile" icon={<AccountCircleOutlined />} />
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
    <React.Fragment>
      <TopBar />
      <Page>
        <Switch>
          <Route exact path="/" component={Leagues} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/leagues" component={Leagues} />
          <Route exact path="/leagues/new" component={NewLeagueForm} />
          <Route exact path="/leagues/:id" component={League} />
          <Route exact path="/leagues/:leagueId/races/:raceId" component={Race} />
        </Switch>
      </Page>
    </React.Fragment>
  );
}

export default ThemedApp;
