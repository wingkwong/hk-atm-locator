import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
      }
};

class ATMFunctionalities extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root}>
         <List >
            <ListItem>
                <ListItemText
                    primary="Searching ATMs near you"
                    secondary='In order to use this feature, location access has to be granted.'
                />
            </ListItem>
            <Divider/>
            <ListItem>
                <ListItemText
                    primary="Export ATM data in a standardised format "
                    secondary='This feature is still under development.'
                />
            </ListItem>
        </List>
      </Paper>
    );
  }
}

ATMFunctionalities.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMFunctionalities));
