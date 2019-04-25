import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
    setSelectedLocation
} from '../../actions'

const styles = theme => ({
    popUpContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0
        }
    },
});

class ATMMarkerClusterGroup extends React.Component {
    componentDidMount() {    
    }

    markerOnClick(data) {
        // Center the map 
        // const { ATMAddress } = data;
        // this.props.setSelectedLocation(ATMAddress.LatitudeDescription, ATMAddress.LongitudeDescription);
    }

    renderPopUp(data) {
        const { classes } = this.props;
        return (
            <Popup>
                <CardContent className={classes.popUpContent}>
                    <Typography variant="h5" component="h2">
                        { data.ATMName }
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        { data.ATMAddress.AddressLine }
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        { data.BranchName }
                    </Typography>
                    <Typography component="p">
                        { data.HotlineNumber }
                    </Typography>
                </CardContent>
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
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        atm: state.atm.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedLocation: (lat, lng) => {
            dispatch(setSelectedLocation(lat, lng))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMMarkerClusterGroup));
  