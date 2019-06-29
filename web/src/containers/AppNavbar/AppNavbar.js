import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MapIcon from '@material-ui/icons/Map';
// import LiveHelpIcon from '@material-ui/icons/LiveHelp';
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
  appbar: {
    backgroundColor: '#B13515',
    color: '#ffffff'
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Link
              to={{
                  pathname: `/`,
              }}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <IconButton className={classes.backButton} color="inherit" aria-label="Back to previous page">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          
            <Typography variant="h6" color="inherit">
              Hong Kong ATM Locator
            </Typography>

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
                {/* TODO:  */}
                {/* <IconButton
                  onClick={this.handleAboutToggle}
                  color="inherit"
              >
                <LiveHelpIcon/>
              </IconButton> */}
              </div>
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
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