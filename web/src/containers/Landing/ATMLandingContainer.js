import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppNavbar from '../AppNavbar/AppNavbar';
import ATMListingContainer from './ATMListingContainer';
import ATMMapContainer from './ATMMapContainer';
import { jetco, hangseng, hsbc } from '../../constants/networks';
import ATM404Container from '../ATM404Container/ATM404Container';

const styles = {
    
};

class ATMLandingContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        const { toggleMapView } = this.props;
        const { params: { network } } = this.props.match;
        
        if(network != jetco.idx && network != hangseng.idx && network != hsbc.idx ) {
            return (
                <ATM404Container/>
            )
        }
        
        return (
            <React.Fragment>
               <AppNavbar/>
                { !toggleMapView && <ATMListingContainer network={network}/>}
                { toggleMapView && <ATMMapContainer network={network}/>}
            </React.Fragment>
        );
    }
}

ATMLandingContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
       toggleMapView: state.page.toggle_map_view
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMLandingContainer));