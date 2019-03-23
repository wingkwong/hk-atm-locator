import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ATMMarkerClusterGroup from '../../components/Leaflet/ATMMarkerClusterGroup';
import ATMListing from '../../components/ATMListing/ATMListing';
import HANG_SENG_DATA from '../../data/hang_seng.json';
import HSBC_DATA from '../../data/hsbc.json';
import { distanceBetweenTwoGeoPoints } from '../../utils/geoUtils';

import {
    setATMData
} from '../../actions'

const styles = {
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
  };

class Landing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 22.308,
                lng: 114.1716
            },
            zoom: 14,
        }
        this.initATMData();
        this.detectCurrentLocation();
    }

    detectCurrentLocation() {
        const me = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
             function success(position) {
                me.setState({
                    currentLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
                me.sortATMData();
             });
        } else {
            me.sortATMData();
        }
    }

    initATMData() {
        const hangSengATMs = HANG_SENG_DATA.data[0].Brand[0].ATM;
        const hsbcATMs = HSBC_DATA.data[0].Brand[0].ATM;
        const allATMs = [...hangSengATMs, ...hsbcATMs];
        /*
            TODO: 
            - Data enrichment: (lat, lng for hang seng atms)
        */
        this.props.setATMData(allATMs);
    }

    sortATMData() {
        const { atm } = this.props;
        const { currentLocation } = this.state;
        const sortedAllATMs = [].concat(atm)
         .sort( (x, y) => {
            if(x.ATMAddress.LatitudeDescription != null && x.ATMAddress.LongitudeDescription != null &&
                y.ATMAddress.LatitudeDescription != null && y.ATMAddress.LongitudeDescription != null ) {
                    const distanceX = distanceBetweenTwoGeoPoints(currentLocation.lat, currentLocation.lng, x.ATMAddress.LatitudeDescription, x.ATMAddress.LongitudeDescription);
                    const distanceY = distanceBetweenTwoGeoPoints(currentLocation.lat, currentLocation.lng, y.ATMAddress.LatitudeDescription, y.ATMAddress.LongitudeDescription);
                    return distanceX > distanceY ? 1 : -1;
                }
            return -1;
        })
        .map( (atm) => ({
            ...atm,
            distance: distanceBetweenTwoGeoPoints(currentLocation.lat, currentLocation.lng, atm.ATMAddress.LatitudeDescription, atm.ATMAddress.LongitudeDescription)
        }));

        this.props.setATMData(sortedAllATMs);
    }

    render() {
        const { classes } = this.props;
        const position = [this.state.currentLocation.lat, this.state.currentLocation.lng];
        
        return (
            <React.Fragment>
                <ATMListing/>
                <Map center={position} zoom={this.state.zoom} maxZoom={20} className={classes.mapContainer}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ATMMarkerClusterGroup/>
                </Map>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setATMData: (atmData) => {
            dispatch(setATMData(atmData));
        }
    };
}
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));