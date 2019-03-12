import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

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
            zoom: 13,
        }
    }

    render() {
        const { classes } = this.props;
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom} className={classes.mapContainer}>
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    Meet-up at Eaton HK 1/F at 8:00 P.M. 
                </Popup>
                </Marker>
            </Map>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));