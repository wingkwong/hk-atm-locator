import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    // inline: {
    //     display: 'inline',
    // },
});

class ATMItem extends React.Component {
    render() {
        const { idx, atm, classes } = this.props;
        const { ATMName, ATMAddress } = atm;

        return (
            <ListItem button key={ idx }>
                <ListItemText
                    primary= { ATMName }
                    secondary={
                        <React.Fragment>
                            { ATMAddress.AddressLine }
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
  