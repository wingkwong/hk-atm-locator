import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        padding: 20
    }
};

class ATMIntro extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root}>
            <Typography >
                Hong Kong ATM Locator is an information service providing all ATM information in Hong Kong. The original data is provided by each bank Open APIs following the framework published by The Hong Kong Monetary Authority (HKMA). 
                As each bank has implemented its group standard for implementing Open APIs at global or regional levels, the overall interoperability is frustrating. 
                In order to increase the interoperability and fulfil the industry’s desire to see a common set of Open APIs, the data utilized in Hong Kong ATM Locator has been transformed and enriched to a standardised schema and will be released to the general public.
            </Typography>
        </Paper>
    );
  }
}

ATMIntro.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMIntro));
