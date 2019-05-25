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
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {
  toggleMapView,
  toggleAboutDialog
} from '../../actions';
// import ATMSearchbar from '../../components/ATMFilter/ATMSearchbar';

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
  },
  dialogTitle: {
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

  backToPreviewPage =() => {
    this.props.toggleAboutDialog(false)
  }

  handleViewChange = () => {
    const { toggleMapview } = this.state;
    this.props.toggleMapView(toggleMapview);
    this.setState({
      toggleMapview: !toggleMapview
    })
  };

  handleAboutToggle = () => {
    this.props.toggleAboutDialog(true);
  }

  render() {
    const { classes, isDialogAppNavBar, dialogAppNavBarType } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            { isDialogAppNavBar && dialogAppNavBarType == "landing" && <IconButton className={classes.backButton} color="inherit" aria-label="Back to Home page" onClick={() => {this.backToLandingPage()}}>
              <ArrowBackIcon />
              </IconButton>
          }

          { isDialogAppNavBar && dialogAppNavBarType == "about" && <IconButton className={classes.backButton} color="inherit" aria-label="Back to previous page" onClick={() => {this.backToPreviewPage()}}>
            <ArrowBackIcon />
            </IconButton>
          }
          
            <Typography className={isDialogAppNavBar ? classes.dialogTitle : classes.landingTitle} variant="h6" color="inherit">
              Hong Kong ATM Locator
            </Typography>

            { isDialogAppNavBar && 
              <React.Fragment>
                {/* <ATMSearchbar/> */}
                <div className={classes.grow} />
                <div >
                  <IconButton
                    onClick={this.handleViewChange}
                    color="inherit"
                  >
                    <MapIcon />
                  </IconButton>
                  <IconButton
                    onClick={this.handleAboutToggle}
                    color="inherit"
                >
                  <LiveHelpIcon/>
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
  backToLandingPage: PropTypes.func,
  dialogAppNavBarType: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      toggleMapView: (flag) => {
          dispatch(toggleMapView(flag))
      },
      toggleAboutDialog: (flag) => {
        dispatch(toggleAboutDialog(flag))
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AppNavbar));