import React from 'react';
import { Divider, Drawer, List, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import FlagIcon from '@material-ui/icons/Flag';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import useStyles from 'utils/styles';
import Home from 'components/pages/home/Home';
import ListItemLink from 'components/common/ListItemLink';
import Leagues from 'components/pages/leagues/Leagues';
import Race from 'components/pages/race/Race';
import NewLeagueForm from 'components/pages/leagues/NewLeagueForm';
import League from 'components/pages/league/League';
import About from 'components/pages/about/About';

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fafafa"
    },
    primary: {
      light: "#ff6737",
      // main: "#ff2800",
      main: "#e10600",
      dark: "#c30000",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
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
      <Typography>
        F1 Pick 'Em
      </Typography>
    </Link>
  )
}

// TODO: make this responsive for mobile
// large screens should be persitent with site title on sidebar
// small screens should move site title to center toolbar and add hamburger menu
function Sidebar() {
  const classes = useStyles();

  return (
      <Drawer
        variant="permanent"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        className={classes.drawer}
        classes={{
          paper: classes.drawer
        }}
      >
        <Title />
        <Divider />
        <List>
          <ListItemLink to="/about" primary="About" icon={<InfoIcon />}/>
          <ListItemLink to="/leagues" primary="Leagues" icon={<FlagIcon />}/>
        </List>
      </Drawer>
  )
}

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/leagues' component={Leagues} />
        <Route exact path='/leagues/new' component={NewLeagueForm} />
        <Route exact path='/leagues/:id' component={League} />
        <Route exact path='/leagues/:leagueId/races/:raceId' component={Race} />
      </Switch>
    </div>
  )
}

export default ThemedApp;