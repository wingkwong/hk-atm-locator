import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import FilterIcon from '@material-ui/icons/Tune';
import {
  toggleATMFilterDialog
} from '../../actions';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    width: '100%',
    zIndex: 1200,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class ATMSearch extends Component{

  advancedFilterOnClick = () => {
    this.props.toggleATMFilterDialog(true);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase className={classes.input} placeholder="Search ..." />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton color="secondary" className={classes.iconButton} aria-label="Directions">
          <DirectionsIcon />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton color="secondary" className={classes.iconButton} aria-label="advanced-filter" onClick={() => this.advancedFilterOnClick()}>
          <FilterIcon />
        </IconButton>
      </Paper>
    );
  }
}

ATMSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      toggleATMFilterDialog: (open) => {
          dispatch(toggleATMFilterDialog(open))
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMSearch));