import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { distanceBetweenTwoGeoPoints } from '../../utils/geoUtils';
import ATMSearch from '../../components/ATMFilter/ATMSearch';
import ATMFilterPanel from '../../components/ATMFilter/ATMFilterPanel';
import ATMListing from '../../components/ATMListing/ATMListing';
import HANG_SENG_DATA from '../../data/hang_seng.json';
import HANG_SENG_LATLNG_DATA from '../../data/hang_seng_latlng.json';
import HSBC_DATA from '../../data/hsbc.json';

import {
    setATMData,
    setCurrentLocation,
    setSelectedLocation
} from '../../actions'

const styles = {
   
  };

class LandingListView extends Component{
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
        const me = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
             function success(position) {

                me.props.setCurrentLocation(position.coords.latitude, position.coords.longitude);
                me.props.setSelectedLocation(position.coords.latitude, position.coords.longitude);
                me.sortATMData();
             });
        } else {
            me.sortATMData();
        }
    }

    initATMData() {
        const hangSengATMs = HANG_SENG_DATA.data[0].Brand[0].ATM;
        let hangSengLatLngLUT = new Object();
        for (let i=0;i<HANG_SENG_LATLNG_DATA.length; i++){
            let rec = HANG_SENG_LATLNG_DATA[i];
            hangSengLatLngLUT[rec.address] = {'lat': rec.lat, 'lng': rec.lng};
        }
        for (let i=0;i<hangSengATMs.length; i++){
            let rec = hangSengATMs[i];
            let latlng = hangSengLatLngLUT[rec.ATMAddress.AddressLine[0]];
            if (latlng){
                rec.ATMAddress.LatitudeDescription = latlng.lat;
                rec.ATMAddress.LongitudeDescription = latlng.lng;
            }
        }

        const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
        const allATMs = [...hangSengATMs, ...hsbcATMs];

        this.props.setATMData(allATMs);
    }

    sortATMData() {
        const { atm } = this.props;
        const { currentLocation } = this.state;
        let location = currentLocation;

        if(atm) {
            if(this.props.currentLocation != undefined) {
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
            .map( (atm) => ({
                ...atm,
                distance: distanceBetweenTwoGeoPoints(location.lat, location.lng, atm.ATMAddress.LatitudeDescription, atm.ATMAddress.LongitudeDescription)
            }));
    
            this.props.setATMData(sortedAllATMs);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ATMSearch/>
                <ATMFilterPanel/>
                <ATMListing/>
            </React.Fragment>
        )
    }
}

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
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingListView));