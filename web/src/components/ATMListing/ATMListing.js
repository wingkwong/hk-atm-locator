import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ATMItem from './ATMItem';
import ATMItemDialog from './ATMItemDialog';

const drawerWidth = '100%';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ATMListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  renderATMItems = () => {
    const allATMs = this.props.atm;
    if(allATMs === undefined) {
      return <div>Loading</div>
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
      return <div>No ATM data</div>
    }
  };

  render() {
    const { classes } = this.props;
    const drawer = (
      <React.Fragment>
        <List>
            {this.renderATMItems()}
        </List>
        <ATMItemDialog/>
      </React.Fragment>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
        </nav>
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
