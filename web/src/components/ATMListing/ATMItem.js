import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import * as moment from 'moment';

import {
    setSelectedLocation,
    toggleATMDetailDialog
} from '../../actions'

const styles = theme => ({
    chip: {
        borderRadius: 0
    }
});

class ATMItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderOpeningClosingTag(openingHours) {
        if(openingHours == undefined || openingHours.length === 0) {
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
        const openTimeInHHMMFormat = openingHours[weekday - 1].OpenTime;
        const closeTimeInHHMMFormat = openingHours[weekday - 1].CloseTime;
        const openTime = moment(openTimeInHHMMFormat, 'HH:mm');
        const closeTime = moment(closeTimeInHHMMFormat, 'HH:mm');
        const isOpen = moment().isBetween(openTime, closeTime);
        const { classes } = this.props;
        return (
            <React.Fragment>
                <br/>
                <Chip
                    label={ isOpen ? 'Opening' : 'Closed' }
                    color={ isOpen ? 'primary' : 'secondary' }
                    className={classes.chip}
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

    atmListItemOnClick(atm, idx) {
        const { ATMAddress: { LatitudeDescription, LongitudeDescription} } = atm;
        console.log(atm)
        if(LatitudeDescription && LongitudeDescription){
            this.props.setSelectedLocation(LatitudeDescription, LongitudeDescription, idx);
        }

        // toggle detail page
        this.props.toggleATMDetailDialog(true);
    }

    render() {
        const { idx, atm } = this.props;
        const { ATMName, ATMAddress, distance } = atm;

        return (
            <React.Fragment>
                <ListItem button key={ idx } onClick={() => this.atmListItemOnClick(atm, idx)}>
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
            </React.Fragment>
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
        setSelectedLocation: (lat, lng, idx) => {
            dispatch(setSelectedLocation(lat, lng, idx))
        },
        toggleATMDetailDialog: (open) => {
            dispatch(toggleATMDetailDialog(open))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItem));
