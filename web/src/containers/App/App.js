import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from '../AppNavbar/AppNavbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
            <AppNavbar location={this.props.location}/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(
  mapStateToProps
)(App);