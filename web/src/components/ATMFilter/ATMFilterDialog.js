import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { jetco } from '../../constants/banks';
import { networks } from '../../constants/networks';
import { connect } from 'react-redux';
import { SERVICES, WEEK_DAYS } from '../../constants/services';


import {
  toggleFilterOption,
  toggleATMFilterDialog
} from '../../actions'


const styles = {
  dialogCustomizedWidth: {
    width: '80%'
  }
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

class ATMFilterDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        network: 'all',
        bank: 'all',
        expanded: false
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
    const services = SERVICES;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Services</FormLabel>
        <FormGroup>
           {
             services.map((service, index) => {
               return (
                  <FormControlLabel
                  control={
                    <Switch
                      checked={this.state[service]}
                      onChange={this.handleCheckboxChange(service).bind(this)}
                      value={service.en}
                    />
                  }
                  label={service.en}
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
    const days = WEEK_DAYS;

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

  handleClose = () => {
    this.props.toggleATMFilterDialog(false);
  }

  render() {
     const { classes, fullScreen } = this.props;
    /*
      TODO: Add Grid for responsive design
    */
    return (
      <Dialog
          fullScreen={fullScreen}
          open={this.props.open || false}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          fullWidth={true}
          maxWidth = {'md'}
        >
          <DialogTitle id="responsive-dialog-title">{"Advaned Filter"}</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
  }
}

ATMFilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const
mapStateToProps = (state, ownProps) => {
    return {
      filters: state.atm.filters,
      open: state.page.filter_dialog_open,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      toggleFilterOption: (key, value) => {
          dispatch(toggleFilterOption(key, value));
      },
      toggleATMFilterDialog: (open) => {
        dispatch(toggleATMFilterDialog(open))
      } 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(ATMFilterDialog)));