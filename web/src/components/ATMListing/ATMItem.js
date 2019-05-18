import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { distanceConverter } from '../../utils/geoUtils';

import {
    setSelectedLocation,
    toggleATMDetailDialog
} from '../../actions'

const styles = theme => ({
    chip: {
        borderRadius: 0,
        width: '100px',
    },
    bankIcon: {
      width: '50px',
      height: '50px',
      marginRight: '20px',
    }
});

class ATMItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderBankIcon(atm) {
      const { classes } = this.props;
      return (
        <img alt={atm.Bank} src={"./images/" + atm.Bank + ".png"} className={classes.bankIcon}></img>
      )
    }

    renderOpeningClosingTag(atm) {
        const isOpenNow = atm.isOpenNow();
        if (isOpenNow === null) {
          return (null);
        }
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Chip
                    label={ isOpenNow ? 'Opening' : 'Closed' }
                    color={ isOpenNow ? 'primary' : 'secondary' }
                    className={classes.chip}
                />
            </React.Fragment>
        )
    }

    renderDistance(distance) {
        if(isNaN(distance)) {
            return (null);
        }

        distance = distanceConverter(distance);
        return (
            <React.Fragment>
                { `${distance} from your current location` }
            </React.Fragment>
        )
    }

    atmListItemOnClick(atm, idx) {
        const { ATMAddress: { LatitudeDescription, LongitudeDescription} } = atm;
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
            <ListItem button key={ idx } onClick={() => this.atmListItemOnClick(atm, idx)}>
                { this.renderBankIcon(atm) }
                <div>
                    <ListItemText
                        primary={ ATMName }
                        secondary={
                            <React.Fragment>
                                { ATMAddress.AddressLine }
                                <br/>
                                { this.renderDistance(distance) }

                            </React.Fragment>
                        }
                    />
                    <div style={{display: 'flex'}}>
                    { this.renderOpeningClosingTag(atm) }
                    </div>
                </div>
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
        setSelectedLocation: (lat, lng, idx) => {
            dispatch(setSelectedLocation(lat, lng, idx))
        },
        toggleATMDetailDialog: (open) => {
            dispatch(toggleATMDetailDialog(open))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMItem));
