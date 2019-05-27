import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExploreIcon from '@material-ui/icons/Explore';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    content: {
        padding: "0px 16px"
    },
    chip: {
        borderRadius: 0,
        width: '100px',
    },
});

class ATMPopup extends React.Component {
    //TODO: make renderOpeningClosingTag common
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

    render() {
        const { atm, classes } = this.props;
        // TODO: Use bank icon as an avatar
        // TODO: Card Action Button
        return (
            <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="bank" className={classes.avatar}>
                  R
                </Avatar>
              }
              title={ atm.ATMName }
              subheader= { atm.ATMAddress.AddressLine }
              className={classes.header}
            />
            <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            />
            <CardContent className={classes.content}>
              { this.renderOpeningClosingTag(atm) }
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Information">
                <InfoIcon />
              </IconButton>
              <IconButton aria-label="Route">
                <ExploreIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>  
        );
    }
}

ATMPopup.propTypes = {
    atm: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ATMPopup));
