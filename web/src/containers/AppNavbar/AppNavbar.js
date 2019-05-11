import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MapIcon from '@material-ui/icons/Map';
import FilterIcon from '@material-ui/icons/Tune';
import {
  toggleATMFilterDialog,
  toggleMapView
} from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: '64px'
  },
  grow: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  dialogTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    whiteSpace: 'nowrap'
  },
  landingTitle: {
    margin: 'auto',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontWeight: 700,
    lineHeight: 1.6,
    fontSize: 24
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.85),
    },
    color: '#f50057',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '100%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 100,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMapview: true
    };
  }

  backToLandingPage = () => {
    this.props.backToLandingPage();
  }

  handleViewChange = () => {
    const { toggleMapview } = this.state;
    this.props.toggleMapView(toggleMapview);
    this.setState({
      toggleMapview: !toggleMapview
    })
  };

  handleFilterOnclick = () => {
    this.props.toggleATMFilterDialog(true);
  }


  render() {
    const { classes, isDialogAppNavBar } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            { isDialogAppNavBar && <IconButton className={classes.backButton} color="inherit" aria-label="Back to Home page" onClick={() => {this.backToLandingPage()}}>
              <ArrowBackIcon />
            </IconButton>}
            <Typography className={isDialogAppNavBar ? classes.dialogTitle : classes.landingTitle} variant="h6" color="inherit">
              Hong Kong ATM Locator
            </Typography>

            { isDialogAppNavBar && 
              <React.Fragment>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                  <div className={classes.filterIcon} onClick={() => {this.handleFilterOnclick()}}>
                    <FilterIcon/>
                  </div>
                </div>
                <div className={classes.grow} />
                <div >
                  <IconButton
                    onClick={this.handleViewChange}
                    color="inherit"
                  >
                    <MapIcon />
                  </IconButton>
                </div>
              </React.Fragment>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isDialogAppNavBar: PropTypes.bool.isRequired,
  backToLandingPage: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      toggleATMFilterDialog: (open) => {
          dispatch(toggleATMFilterDialog(open))
      },
      toggleMapView: (flag) => {
          dispatch(toggleMapView(flag))
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppNavbar));