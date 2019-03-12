import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Routes from '../../routes';
import { BrowserRouter } from 'react-router-dom';

export default class Root extends Component {
  render() {
		const { store } = this.props;
		
    return (
		<Provider store={store} >
			<BrowserRouter>
				<Routes/>
			</BrowserRouter>
		</Provider>	  
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}