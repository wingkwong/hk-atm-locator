import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ATMItemDetail from '../ATMDetail/ATMItemDetail';

const styles = {

};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ATMItemDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, atm } = this.props;
    
    if(!this.props.selectedLocation || !atm) {
      return (null);
    }

    const idx = this.props.selectedLocation.idx;

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.handleDialogClose}
        TransitionComponent={Transition}
      >
       {/* TODO: Investigate idx = -1. Prolly due to zoomLevel */}
       { idx > -1 && atm &&  <ATMItemDetail atm={atm[idx]}/> }
      </Dialog>
    );
  }
}

ATMItemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  atm: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      atm: state.atm.data,
      open: state.page.open,
      selectedLocation: state.location.selectedLocation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItemDialog));
