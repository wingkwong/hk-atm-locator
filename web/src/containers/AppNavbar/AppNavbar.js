import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MapIcon from '@material-ui/icons/Map';
import {
  toggleMapView
} from '../../actions';
import ATMSearchbar from '../../components/ATMFilter/ATMSearchbar';

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
  }
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
                <ATMSearchbar/>
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
      toggleMapView: (flag) => {
          dispatch(toggleMapView(flag))
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppNavbar));