import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = {
    root: {
        width: '100%',
      },
};

function ATMFilterPanel(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
            <Typography className={classes.heading}>Filter</Typography>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
            Detail goes here
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary">
            Submit
            </Button>
        </ExpansionPanelActions>
        </ExpansionPanel>
    </div>
  );
}

ATMFilterPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ATMFilterPanel);