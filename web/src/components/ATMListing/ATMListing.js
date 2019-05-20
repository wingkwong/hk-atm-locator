import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';
import ATMItem from './ATMItem';
import ATMItemDialog from './ATMItemDialog';
import Loader from '../Loader/Loader';

const styles = theme => ({
  root: {
    height: '100%',
    overflow: 'auto'
  },
});

class ATMListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreItems: true,
      atmItems: [],
      size: 10
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.atm !== this.props.atm) {
      this.loadItems();
    }
  }

  loadItems = () => {
    const { atm } = this.props;
    const { size } = this.state;
    if(atm.length > 0) {
      if(size > atm.length) {
        this.setState({
          hasMoreItems: false
        })
      } else {
        this.setState({
          atmItems: atm.slice(0, size),
          size: size + 10
        })
      }
    };
  };

  render() {
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems}
              hasMore={this.state.hasMoreItems}
              loader={<Loader/>}
              useWindow={false}
              >
                <List>
                {
                  this.state.atmItems.map((atm, idx) => {
                    return (
                      <div key={idx}>
                        <ATMItem atm={atm} idx={idx}/>
                       <Divider/>
                      </div>
                    )
                  })
                }
              </List>
          </InfiniteScroll>
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
