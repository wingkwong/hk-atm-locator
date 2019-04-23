import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
    toggleATMDetailDialog
} from '../../actions'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ATMItemDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogClose = () => {
    this.props.toggleATMDetailDialog(false);
  };

  render() {
    const { classes, open } = this.props;
    return (
        <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton  onClick={this.handleDialogClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {/* TODO: LOCATION GOES HERE */}
            </Typography>
          </Toolbar>
        </AppBar>
        {/* TODO: DETAIL CONTENT GOES HERE */}
      </Dialog>
    );
  }
}

ATMItemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
      open: state.page.open
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleATMDetailDialog: (open) => {
      dispatch(toggleATMDetailDialog(open))
  }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItemDialog));
