import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = {
    root: {
        width: '100%',
      },
};

class ATMFilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                <Typography className={classes.heading}>Filter</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="network-select">Network</InputLabel>
                <Select
                    value={this.state.age}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'network',
                    id: 'network-select',
                    }}
                >
                    <MenuItem value="">
                    <em>All</em>
                    </MenuItem>
                    <MenuItem value="hsbc">HSBC</MenuItem>
                    <MenuItem value="hang-seng">Hang Seng</MenuItem>
                    <MenuItem value="jetco">JETCO</MenuItem>
                </Select>
                </FormControl>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                Submit
                </Button>
            </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
      );
  }
}

ATMFilterPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ATMFilterPanel);