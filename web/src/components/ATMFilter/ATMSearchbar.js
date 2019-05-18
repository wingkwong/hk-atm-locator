import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/Tune';
import {
    setATMData,
    toggleATMFilterDialog
  } from '../../actions';

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.85),
        },
        color: '#f50057',
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: '100%',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      filterIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: 0
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 100,
        },
      },
});

class ATNSearchbar extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleFilterOnclick = () => {
        this.props.toggleATMFilterDialog(true);
    }

    handleChange = (e) => {
        // TODO:
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                onChange={this.handleChange}
                />
                <div className={classes.filterIcon} onClick={() => {this.handleFilterOnclick()}}>
                <FilterIcon/>
                </div>
            </div>
        );
    }
}

ATNSearchbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        toggleATMFilterDialog: (open) => {
            dispatch(toggleATMFilterDialog(open))
        },
        setATMData: (atmData) => {
            dispatch(setATMData(atmData));
        },
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATNSearchbar));