import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { loadAllData, loadHSBCData, loadHangSengData, loadJetcoData } from '../../utils/dataLoader';
import ATMPopup from './ATMPopup';
import {
    setATMData,
    setSelectedLocation
} from '../../actions'

const styles = theme => ({
    popUp: {
       margin: 0
    },
});

class ATMMarkerClusterGroup extends React.Component {
    constructor(props) {
        super(props);
        this.initATMData();
    }

    initATMData() {
        const { network } = this.props;
        var ATMs = null;
        if(network === 'hsbc') {
            ATMs = loadHSBCData();
        } else if(network === 'hangseng') {
            ATMs = loadHangSengData();
        } else if(network === 'jetco') {
            ATMs = loadJetcoData();
        } else {
            ATMs = loadAllData();
        }
        this.props.setATMData(ATMs);
    }

    markerOnClick(data) {
        // Center the map 
        // const { ATMAddress } = data;
        // this.props.setSelectedLocation(ATMAddress.LatitudeDescription, ATMAddress.LongitudeDescription);
    }

    renderPopUp(data) {
        const { classes } = this.props;
        return (
            <Popup className={classes.popUp}>
                <ATMPopup atm={data}/>
            </Popup>
        );
    }

    renderMarkerClusterGroup() {
        const { atm } = this.props;
        return (
            <MarkerClusterGroup>
                {
                    atm.map((data, idx) => {
                        const latitude = data.ATMAddress.LatitudeDescription;
                        const longitude = data.ATMAddress.LongitudeDescription;
                        if(latitude !== undefined && longitude !== undefined) {
                            return (
                                <Marker 
                                    key= { idx }
                                    position= { [latitude, longitude] } 
                                    onMouseOver= { (e) => {
                                        e.target.openPopup();
                                    }}
                                    onMouseOut= { (e) => {
                                        // e.target.closePopup();
                                    }}
                                    onClick = { () => this.markerOnClick(data) }
                                >
                                { this.renderPopUp(data) }
                                </Marker>
                            );
                        }
                        return (null);
                    })
                }
            </MarkerClusterGroup>
        );
    }

    render() {
        return this.renderMarkerClusterGroup();
    }
}

ATMMarkerClusterGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    network: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setATMData: (atmData) => {
            dispatch(setATMData(atmData));
        },
        setSelectedLocation: (lat, lng) => {
            dispatch(setSelectedLocation(lat, lng))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMMarkerClusterGroup));
  