import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { jetco } from '../../constants/banks';
import { networks } from '../../constants/networks';
import { connect } from 'react-redux';
import { SERVICES, SERVICE_NAMES } from '../../constants/services';

import {
  toggleFilterOption
} from '../../actions'


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
        network: 'all',
        bank: 'all'
    }
  }

  handleSelectChange(event) {
      // this.setState({ [event.target.name]: event.target.value });
      this.props.toggleFilterOption(event.target.name, event.target.value);
  };

  handleCheckboxChange(name) {
      return function(event){
          // this.setState({ [name]: event.target.checked });
          this.props.toggleFilterOption(name, event.target.checked);
      }
  };

  renderNetworkSelect() {
    const { classes, filters: { network }} = this.props;
    return (
      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="network-select">Network</InputLabel>
          <Select
              value={network === undefined ? 'all' : network}
              onChange={this.handleSelectChange.bind(this)}
              inputProps={{
              name: 'network',
              id: 'network-select',
              }}
              MenuProps={MenuProps}
          >
            <MenuItem value='all'>All</MenuItem>
              {
                networks.map((network, index) => {
                  return (
                    <MenuItem value={network.idx} key={index}>
                      {network.en}
                    </MenuItem>
                  );
                })
              }
          </Select>
        </FormControl>
    );
  }

  renderBankSelect() {
    /*
      TODO: the value s restricted based on Network
    */
    const { classes, filters: { bank } } = this.props;
    return (
      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="bank-select">Bank</InputLabel>
          <Select
              value={bank === undefined ? 'all' : bank}
              onChange={this.handleSelectChange.bind(this)}
              inputProps={{
              name: 'bank',
              id: 'bank-select',
              }}
              MenuProps={MenuProps}
          >
            <MenuItem value='all'>All</MenuItem>
            {
              jetco.map((bank, index) => {
                return (
                  <MenuItem value={bank.idx} key={index}>
                    {bank.en}
                  </MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
    );
  }

  renderServicesCheckbox() {
    const serviceIndexes = SERVICES;
    const services = SERVICE_NAMES;

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
                      onChange={this.handleCheckboxChange(serviceIndex).bind(this)}
                      value={services[index]}
                    />
                  }
                  label={services[index]}
                  key={index}
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
                      onChange={this.handleCheckboxChange(day).bind(this)}
                      value={day}
                    />
                  }
                  label={day}
                  key={index}
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
                    onChange={this.handleCheckboxChange(option).bind(this)}
                    value={option}
                  />
                }
                label={option}
                key={index}
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
                { this.renderBankSelect() }
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

const
mapStateToProps = (state, ownProps) => {
    return {
      filters: state.atm.filters
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFilterOption: (key, value) => {
            dispatch(toggleFilterOption(key, value));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMFilterPanel));