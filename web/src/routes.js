import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ATMLandingContainer from './containers/Landing/ATMLandingContainer';

export default class Routes extends Component{
    render() {
        return (
            <Route path='/' component={ATMLandingContainer}/>
        )
    }
}