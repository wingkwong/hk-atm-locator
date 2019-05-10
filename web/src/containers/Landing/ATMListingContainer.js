import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { distanceBetweenTwoGeoPoints } from '../../utils/geoUtils';
import ATMFilterDialog from '../../components/ATMFilter/ATMFilterDialog';
import ATMListing from '../../components/ATMListing/ATMListing';
import { loadAllData, loadHSBCData, loadHangSengData } from '../../utils/dataLoader';


import {
    setATMData,
    setCurrentLocation,
    setSelectedLocation
} from '../../actions'

const styles = {

  };

class ATMListingContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: {
                lat: 22.308,
                lng: 114.1716
            },
            currentLocation: {
                lat: 22.308,
                lng: 114.1716
            },
            zoom: 14,
            isMapInit: false
        }
        this.initATMData();
        this.detectCurrentLocation();
    }

    detectCurrentLocation() {
        const { currentLocation, selectedLocation } = this.state;
        const me = this;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
             function success(position) {
                me.props.setCurrentLocation(position.coords.latitude, position.coords.longitude);
                me.props.setSelectedLocation(position.coords.latitude, position.coords.longitude);
                me.sortATMData();
             }, (err) => {
                me.props.setCurrentLocation(currentLocation);
                me.props.setSelectedLocation(selectedLocation);
               // cannot get location, sort data anyway
                me.sortATMData();
             },{ timeout: 10000 });
        } else {
            me.sortATMData();
        }
    }

    initATMData() {
        const { network } = this.props;
        var ATMs = null;
        if(network == 'hsbc') {
            ATMs = loadHSBCData();
        } else if(network == 'hangseng') {
            ATMs = loadHangSengData();
        } else if(network == 'jetco') {
            // ATMs = loadJetcoData();
        } else {
            ATMs = loadAllData();
        }
        this.props.setATMData(ATMs);
    }

    sortATMData() {
        const { atm } = this.props;
        const { currentLocation } = this.state;
        let location = currentLocation;
        if(atm) {
            if(this.props.currentLocation !== undefined) {
                location = this.props.currentLocation
            }

            const sortedAllATMs = [].concat(atm)
             .sort( (x, y) => {
                if(x.ATMAddress.LatitudeDescription != null && x.ATMAddress.LongitudeDescription != null &&
                    y.ATMAddress.LatitudeDescription != null && y.ATMAddress.LongitudeDescription != null ) {
                        const distanceX = distanceBetweenTwoGeoPoints(location.lat, location.lng, x.ATMAddress.LatitudeDescription, x.ATMAddress.LongitudeDescription);
                        const distanceY = distanceBetweenTwoGeoPoints(location.lat, location.lng, y.ATMAddress.LatitudeDescription, y.ATMAddress.LongitudeDescription);
                        return distanceX > distanceY ? 1 : -1;
                    }
                return -1;
            })
            .map( (atm) => {
                atm.distance = distanceBetweenTwoGeoPoints(location.lat, location.lng, atm.ATMAddress.LatitudeDescription, atm.ATMAddress.LongitudeDescription);
                return atm;
            });

            this.props.setATMData(sortedAllATMs);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ATMFilterDialog/>
                <ATMListing/>
            </React.Fragment>
        )
    }
}

ATMListingContainer.propTypes = {
    network: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data,
        selectedLocation: state.location.selectedLocation,
        selectedZoomLvl: state.location.selectedZoomLvl,
        currentLocation: state.location.currentLocation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setATMData: (atmData) => {
            dispatch(setATMData(atmData));
        },
        setSelectedLocation: (lat, lng, zoomLvl=-1) => {
            dispatch(setSelectedLocation(lat, lng, zoomLvl))
        },
        setCurrentLocation: (lat, lng) => {
            dispatch(setCurrentLocation(lat, lng))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMListingContainer));