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

  render() {
    const { atm, selectedLocation } = this.props;
    
    if(!selectedLocation || !selectedLocation.idx || !atm) {
      return (null);
    }
    
    const idx = this.props.selectedLocation.idx;
    let filteredATMs = atm.filter(o => {
      return o.ATMId == idx
    });

    return (
      <Dialog
        fullScreen
        open={this.props.open || false}
        onClose={this.handleDialogClose}
        TransitionComponent={Transition}
      >
        <ATMItemDetail atm={filteredATMs[0]}/>
      </Dialog>
    );
  }
}

ATMItemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  atm: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      atm: state.atm.data,
      open: state.page.detail_dialog_open,
      selectedLocation: state.location.selectedLocation
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItemDialog));
