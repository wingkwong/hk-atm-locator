import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App/App';
import ATMLandingContainer from './containers/Landing/ATMLandingContainer';

export default class Routes extends Component{
    render() {
        return (
            <div>
                <Route path='/' component={App(ATMLandingContainer)}/>
            </div>
        )
    }
}