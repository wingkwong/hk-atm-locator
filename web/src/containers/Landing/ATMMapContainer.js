import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ATMMarkerClusterGroup from '../../components/Leaflet/ATMMarkerClusterGroup';
import ATMRouting from '../../components/Leaflet/ATMRouting';
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
        width: '100%',
        height: '100%',
    },
  };

class ATMMapContainer extends Component{
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
                <Map 
                    className={classes.mapContainer}
                    center={selectedPosition} 
                    zoom= {zoomLvlToUse}
                    maxZoom={zoomLvlToUse + 2} 
                    onmoveend={this.handleMoveEnd}
                    ref={this.saveMap}>

                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ATMMarkerClusterGroup/>
                    <Marker position={currentPosition} icon={icon}/>
                    {/* {
                        this.state.isMapInit && 
                            <ATMRouting map={this.map} from={currentPosition} to={selectedPosition}/>
                    } */}
                </Map>
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
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ATMMapContainer));