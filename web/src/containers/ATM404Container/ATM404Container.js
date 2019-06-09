import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const styles = {
    landingContainer: {
        textAlign: 'center',
        height: '100%',
        color: '#ffffff',
        background: '-webkit-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -webkit-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: '-o-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -o-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: '-moz-linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), -moz-linear-gradient(110deg, #34a344 60%, #004966 80%)',
        background: 'linear-gradient(110deg, #ff0000 0%, rgba(0, 0, 0, 0) 40%), linear-gradient(110deg, #34a344 60%, #004966 80%)',
        overflow: 'auto'
    },
    subheader: {
        fontFamily: 'Roboto Condensed, sans-serif',
        fontWeight: 700,
        lineHeight: 1.6,
        fontSize: 24,
        color: '#ffffff',
        paddingTop: '25px',
    },
    divider: {
        width: '300px',
        height: '4px',
        margin: '8px auto 0',
        display: '#000000',
        backgroundColor: '#ffffff'
    },
    paper: {
        overflow: 'hidden'
    }
};

class ATM404Container extends Component{
    constructor(props) {
        super(props);
    }

   

    render() {
        const { classes } = this.props;
        
        return (
            <React.Fragment>
                <div className={classes.landingContainer}>
                    <Typography className={classes.subheader} variant="h6" color="inherit">
                    Hong Kong ATM Locator
                        <Divider className={classes.divider}/>
                    </Typography>
                    <br/>
                    <Typography variant="h4" color="inherit">
                        The page you are looking for was not found
                    </Typography>
                </div>
            </React.Fragment>
        );
    }
}

ATM404Container.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATM404Container));