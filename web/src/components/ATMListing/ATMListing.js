import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ATMItem from './ATMItem';
import ATMItemDialog from './ATMItemDialog';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class ATMListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  renderATMItems = () => {
    const allATMs = this.props.atm;
    if(allATMs === undefined) {
      return (
        <ListItem>
          <ListItemText primary={'Loading ...'} />
        </ListItem>
      );
    }

    if(allATMs.length > 0) {
      return allATMs.map((atm, idx) => {
        return (
            <React.Fragment key={idx}>
                <ATMItem atm={atm} idx={idx}/>
                <Divider />
            </React.Fragment>
        );
    });
    } else {
      return (
        <ListItem>
            <ListItemText primary={'No matching items found'} />
        </ListItem>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.renderATMItems()}
        </List>
        <ATMItemDialog/>
    </div>
    );
  }
}

ATMListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    atm: state.atm.data
  };
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ATMListing));
