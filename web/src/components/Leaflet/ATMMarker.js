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

class ATMMarker extends React.Component {

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

        const latitude = atm.ATMAddress.LatitudeDescription;
        const longitude = atm.ATMAddress.LongitudeDescription;
        return (
            <Marker 
                position= { [latitude, longitude] } 
                // onMouseOver= { (e) => {
                //     e.target.openPopup();
                // }}
                // onMouseOut= { (e) => {
                //     // e.target.closePopup();
                // }}
            >
            {/* { this.renderPopUp(atm) } */}
            </Marker>
        );
    }

    render() {
        return this.renderMarkerClusterGroup();
    }
}

ATMMarker.propTypes = {
    atm: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMMarker));
  