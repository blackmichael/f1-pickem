import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navBar: {
    whitespace: 'nowrap',
    flexShrink: 0,
    height: theme.spacing(8),
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  title: {
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
    width: '180px',
    minWidth: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '32px',
    letterSpacing: '-3px',
    wordSpacing: '-3px',
    fontStyle: 'italic',
    fontVariant: 'small-caps',
    textTransform: 'none',
    fontWeight: '600',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    width: '100%',
    maxWidth: '600px',
  },
}));

export default useStyles;
