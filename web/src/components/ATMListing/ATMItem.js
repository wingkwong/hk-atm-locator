import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

import {
    setSelectedLocation
} from '../../actions'

const styles = theme => ({
    footer: {
        display: 'flex',
        flexWrap: 'wrap',
      }
});

class ATMItem extends React.Component {
    renderOpeningClosingTag(openingHours) {
        if(openingHours == undefined) {
            return (null);
        }

        let weekday = new Date().getDay();
        // Sunday   - weekday: 0
        // Monday   - weekday: 1
        // Tuesday  - weekday: 2
        // ...
        // Saturday - weekday: 6

        if(weekday == 0) {
            weekday = 7;
        }

        // openingHours
        // [0]  - Monday 
        // [0]  - Tuesday 
        // ...
        // [6]] - Sunday 
        const closeTimeInHHMMFormat = openingHours[weekday - 1].CloseTime;
        const closeTimeHour = closeTimeInHHMMFormat.split(":")[0];
        const closeTimeMinute = closeTimeInHHMMFormat.split(":")[1];
        const currentTime = new Date();
        let closeTime = new Date();
        closeTime.setHours(closeTimeHour);
        closeTime.setMinutes(closeTimeMinute);

        return (
            <React.Fragment>
                <br/>
                <Chip
                    label={ currentTime > closeTime ? 'Opening' : 'Closed' }
                    color={ currentTime > closeTime ? 'primary' : 'secondary' }
                />
            </React.Fragment>
        )
    }

    renderDistance(distance) {
        if(isNaN(distance)) {
            return (null);
        }

        distance = distance > 1 ? Math.round(distance) + ' km' : Math.round(distance * 1000) + ' m';
        return (
            <React.Fragment>
                { `${distance} from your current location` }
            </React.Fragment>
        )
    }

    atmListItemOnClick(atm) {
        const { ATMAddress: { LatitudeDescription, LongitudeDescription} } = atm;
        if(LatitudeDescription && LongitudeDescription){
            this.props.setSelectedLocation(LatitudeDescription, LongitudeDescription);
        }
    }

    render() {
        const { idx, atm, classes } = this.props;
        const { ATMName, ATMAddress, distance } = atm;
        
        return (
            <ListItem button key={ idx } onClick={() => this.atmListItemOnClick(atm)}>
                <ListItemText
                    primary={ ATMName }
                    secondary={
                        <React.Fragment>
                            { ATMAddress.AddressLine }
                            <br/>
                            { this.renderDistance(distance) }
                            { this.renderOpeningClosingTag(atm.OpeningHours) }
                        </React.Fragment>
                    }
                />
            </ListItem>
        );
    }
}

ATMItem.propTypes = {
    idx: PropTypes.number.isRequired,
    atm: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedLocation: (lat, lng) => {
            dispatch(setSelectedLocation(lat, lng))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItem));
  