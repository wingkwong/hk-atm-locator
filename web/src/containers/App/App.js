import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from '../AppNavbar/AppNavbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

const App = (WrappedComponent) => {
  class AppHOC extends Component {
    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <div>
              <AppNavbar location={this.props.location}/>
              <WrappedComponent/>
          </div>
        </MuiThemeProvider>
      );
    }
  }
  return AppHOC;
}

export default App;