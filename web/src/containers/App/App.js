import React, { Component } from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = (WrappedComponent) => {
  class AppHOC extends Component {
    render() {
      return (
        <MuiThemeProvider theme={theme}>
            <AppNavbar/>
            <WrappedComponent/>
        </MuiThemeProvider>
      );
    }
  }
  return AppHOC;
}

export default App;