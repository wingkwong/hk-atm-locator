import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class ATMItem extends React.Component {
    renderOpeningClosingTag(openingHours) {
        if(openingHours == undefined) {
            return (null);
        }

        const weekday = new Date().getDay();
        // Monday   - weekday: 1
        // Tuesday  - weekday: 2
        // ...
        // Sunday   - weekday: 7

        const closeTimeInHHMMFormat = openingHours[weekday - 1].CloseTime;
        const closeTimeHour = closeTimeInHHMMFormat.split(":")[0];
        const closeTimeMinute = closeTimeInHHMMFormat.split(":")[1];
        const currentTime = new Date();
        let closeTime = new Date();
        closeTime.setHours(closeTimeHour);
        closeTime.setMinutes(closeTimeMinute);

        return (
            <Chip
                label={ currentTime > closeTime ? 'Opening' : 'Closed' }
                color={ currentTime > closeTime ? 'primary' : 'secondary' }
            />
        )
    }

    render() {
        const { idx, atm, classes } = this.props;
        const { ATMName, ATMAddress } = atm;
        
        return (
            <ListItem button key={ idx }>
                <ListItemText
                    primary={ ATMName }
                    secondary={
                        <React.Fragment>
                            { ATMAddress.AddressLine }
                            <br/>
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

export default withStyles(styles, { withTheme: true })(ATMItem);
  