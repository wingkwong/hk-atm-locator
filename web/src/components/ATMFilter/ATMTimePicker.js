import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
});

class ATMTimePicker extends React.Component {
  render() {
    const { classes, label, defaultValue } = this.props;
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label={label}
          type="time"
          defaultValue={defaultValue}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        />
      </form>
    );
  }
}

ATMTimePicker.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
};

export default withStyles(styles)(ATMTimePicker);