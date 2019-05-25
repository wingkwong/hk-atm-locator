import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppNavbar from '../../containers/AppNavbar/AppNavbar';
import ATMDataSource from './ATMDataSource';
import ATMFunctionalities from './ATMFunctionalities';
import ATMIntro from './ATMIntro';

const styles = {
    root: {
        padding: 20,
    },
    section: {
        paddingTop: 20,
        paddingBottom: 30
    }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ATMAboutDialog extends React.Component {
 //TODO: set isDialogAppNavBar to true and fix return issue
  render() {
    const { classes } = this.props;
    
    return (
      <Dialog
        fullScreen
        open={this.props.open || false}
        onClose={this.handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppNavbar isDialogAppNavBar={false} />
        <div className={classes.root}>
            <div className={classes.section}>
                <Typography variant="h5" gutterBottom>
                    About
                </Typography>
                <ATMIntro/>
            </div>
            <Divider/>
            <div className={classes.section}>
                <Typography variant="h5" gutterBottom>
                Functionalities
                </Typography>
               <ATMFunctionalities/>
            </div>
            <Divider/>
            <div className={classes.section}>
                <Typography variant="h5" gutterBottom>
                    Data Source
                </Typography>
              <ATMDataSource/>
            </div>
        </div>
      </Dialog>
    );
  }
}

ATMAboutDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      open: state.page.about_dialog_open,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMAboutDialog));
