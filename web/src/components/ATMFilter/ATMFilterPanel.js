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
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
    root: {
        width: '100%',
      },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class ATMFilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        network: 'all'
    }
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  renderNetworkSelect() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="network-select">Network</InputLabel>
          <Select
              value={this.state.network}
              onChange={this.handleSelectChange}
              inputProps={{
              name: 'network',
              id: 'network-select',
              }}
              MenuProps={MenuProps}
          >
              <MenuItem value="all">
              <em>All</em>
              </MenuItem>
              <MenuItem value="hsbc">HSBC</MenuItem>
              <MenuItem value="hang-seng">Hang Seng</MenuItem>
              <MenuItem value="jetco">JETCO</MenuItem>
          </Select>
        </FormControl>
    );
  }

  renderServicesCheckbox() {
    const serviceIndexes = [
      'coinSort',
      'foreignCurrency',
      'disabledAccess',
      'billPayment',
      'cashWithdrawal',
      'cashDeposit',
      'chequeDeposit',
    ];

    const services = [
      'Coin Sort',
      'Foreign Currency',
      'Disabled Access',
      'Bill Payment',
      'Cash Withdrawal',
      'Cash Deposit',
      'Cheque Deposit'
    ];
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Services</FormLabel>
        <FormGroup>
           {
             serviceIndexes.map((serviceIndex, index) => {
               return (
                  <FormControlLabel
                  control={
                    <Switch
                      checked={this.state[serviceIndex]}
                      onChange={this.handleCheckboxChange(serviceIndex)}
                      value={services[index]}
                    />
                  }
                  label={services[index]}
                />
               );
             })
           }
        </FormGroup>
      </FormControl>
    );
  }

  renderOpeningDayCheckbox() {
    const days = [
      'Monday', 
      'Tuesday', 
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Opening Days</FormLabel>
        <FormGroup>
           {
             days.map((day, index) => {
               return (
                  <FormControlLabel
                  control={
                    <Switch
                      checked={this.state[day]}
                      onChange={this.handleCheckboxChange(day)}
                      value={day}
                    />
                  }
                  label={day}
                />
               );
             })
           }
        </FormGroup>
      </FormControl>
    );
  }

  renderOpeningHourCheckbox() {
    return (
      <div></div>
      /*
        TODO:
      */
    );
  }

  renderOpeningOrClosingCheckbox() {
    const options = ['Opening', 'Closed'];
    return (
      <FormControl component="fieldset">
      <FormLabel component="legend">Current Status</FormLabel>
      <FormGroup>
         {
           options.map((option, index) => {
             return (
                <FormControlLabel
                control={
                  <Switch
                    checked={this.state[option]}
                    onChange={this.handleCheckboxChange(option)}
                    value={option}
                  />
                }
                label={option}
              />
             );
           })
         }
      </FormGroup>
    </FormControl>
    );
  }

  render() {
    const { classes } = this.props;
    /*
      TODO: Add Grid for responsive design
    */
    return (
        <div className={classes.root}>
            <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                <Typography className={classes.heading}>Filter</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                { this.renderNetworkSelect() }
                <Divider variant="middle" />
                { this.renderServicesCheckbox() }
                <Divider variant="middle" />
                { this.renderOpeningDayCheckbox() }
                <Divider variant="middle" />
                { this.renderOpeningHourCheckbox() }
                <Divider variant="middle" />
                { this.renderOpeningOrClosingCheckbox() }
                <Divider variant="middle" />
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