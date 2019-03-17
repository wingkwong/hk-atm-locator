import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ATMMarkerClusterGroup from '../../components/Leaflet/ATMMarkerClusterGroup';
import ATMListing from '../../components/ATMListing/ATMListing';
import HANG_SENG_DATA from '../../data/hang_seng.json';
import HSBC_DATA from '../../data/hsbc.json';

import {
    setATMData
} from '../../actions'

const styles = {
    mapContainer: {
      height: '700px',
    },
  };

class Landing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lat: 22.308,
            lng: 114.1716,
            zoom: 14,
        }
        this.initATMData();
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

    render() {
        const { classes } = this.props;
        const position = [this.state.lat, this.state.lng]
        return (
            <React.Fragment>
                <ATMListing/>
                <Map center={position} zoom={this.state.zoom} maxZoom={16} className={classes.mapContainer}>
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