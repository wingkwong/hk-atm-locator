import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    alignItems: 'center',
  }
};

function AppNavbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Hong Kong ATM Locator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavbar);