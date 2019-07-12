import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import ATMDetailContent from './ATMDetailContent';
import {
    // toggleATMDetailDialog
} from '../../actions';


const styles = theme => ({
    appBar: {
        zIndex: 3000,
        backgroundColor: '#B13515',
        color: '#ffffff'
    },
    closeIcon: {
        color: '#ffffff'
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

    // @deprecated
    // handleDialogClose = () => {
    //     this.props.toggleATMDetailDialog(false);
    // };

    render() {
        const { atm, classes, network } = this.props;

        if(!atm) {
            return (null);
        }
        
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                    <Link
                    to={{
                        pathname: `/hk-atm-locator/atm/${network}/`,
                    }}
                    style={{ textDecoration: 'none' }}
                    >
                        <IconButton  
                            // @deprecated
                            // onClick={this.handleDialogClose} 
                            aria-label="Close"
                        >
                        <CloseIcon className={classes.closeIcon}/>
                        </IconButton>
                    </Link>
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
    classes: PropTypes.object.isRequired,
    network: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // @deprecated
        // toggleATMDetailDialog: (open) => {
        //     dispatch(toggleATMDetailDialog(open))
        // }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItemDetail));
  