import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ATMMarkerClusterGroup from '../../components/Leaflet/ATMMarkerClusterGroup';
import ATMRouting from '../../components/Leaflet/ATMRouting';
import ATMFilter from '../../components/ATMFilter/ATMFilter';
import ATMListing from '../../components/ATMListing/ATMListing';
import HANG_SENG_DATA from '../../data/hang_seng.json';
import HANG_SENG_LATLNG_DATA from '../../data/hang_seng_latlng.json';
import HSBC_DATA from '../../data/hsbc.json';
import { distanceBetweenTwoGeoPoints } from '../../utils/geoUtils';
import currentLocationIcon from '../../static/images/you_are_here.png';

import {
    setATMData,
    setCurrentLocation,
    setSelectedLocation
} from '../../actions'

const styles = {
    mapContainer: {
        position: 'absolute',
        top: '64px',
        left: '320px',
        width: 'calc(100% - 320px)',
        height: '100%',
    },
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


        /*
            TODO: 
            - Data enrichment: (lat, lng for hang seng atms)
        */
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

    handleMoveEnd = (evt) => {
        // let latlng = evt.target.getCenter();
        /*
            TODO: better add a new function called setZoomLevel as selectedLocation should not be evt.target.getCenter()
        */
        let latlng = this.props.selectedLocation;
        let zoomLvl = evt.target.getZoom();
        this.props.setSelectedLocation(latlng.lat, latlng.lng, zoomLvl);
    }

    saveMap = (map) => {
        this.map = map;
        this.setState({
            isMapInit: true
        })
    }

    render() {
        const { classes, selectedLocation, selectedZoomLvl, currentLocation } = this.props;
        let selectedPosition = [this.state.selectedLocation.lat, this.state.selectedLocation.lng];
        let currentPosition =  [this.state.currentLocation.lat, this.state.currentLocation.lng];
        let zoomLvlToUse = selectedZoomLvl;
        let icon = L.icon({
            iconUrl: currentLocationIcon,
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            iconSize: [70, 70]
       })

        if(selectedLocation != null && Object.keys(selectedLocation).length == 2 && selectedLocation.lat && selectedLocation.lng) {
            selectedPosition = [selectedLocation.lat, selectedLocation.lng];
        }

        if(currentLocation != null && Object.keys(currentLocation).length == 2 && currentLocation.lat && currentLocation.lng) {
            currentPosition = [currentLocation.lat, currentLocation.lng];
        }

        if (!zoomLvlToUse || zoomLvlToUse<0) zoomLvlToUse=this.state.zoom;

        return (
            <React.Fragment>
                <ATMFilter/>
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