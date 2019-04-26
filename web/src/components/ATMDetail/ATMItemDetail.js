import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import ATMDetailContent from './ATMDetailContent';
import {
    toggleATMDetailDialog
} from '../../actions';


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    root: {
        display: 'flex',
    }
});

class ATMItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    handleDialogClose = () => {
        this.props.toggleATMDetailDialog(false);
    };

    render() {
        const { atm, classes } = this.props;
        
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar className={classes.appBar} position="fixed" color="secondary">
                    <Toolbar>
                        <IconButton  onClick={this.handleDialogClose} aria-label="Close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {atm.ATMName}
                        </Typography>
                    </Toolbar>
                    </AppBar>
                    <ATMDetailContent atm={atm} />
                </div>
            </React.Fragment>
        );
    }
}

ATMItemDetail.propTypes = {
    atm: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleATMDetailDialog: (open) => {
            dispatch(toggleATMDetailDialog(open))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItemDetail));
  