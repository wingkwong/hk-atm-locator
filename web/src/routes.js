import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ATMLandingContainer from './containers/Landing/ATMLandingContainer';
import ATM404Container from './containers/ATM404Container/ATM404Container';

export default class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ATMLandingContainer}/>
                <Route component={ATM404Container} />
            </Switch>
        )
    }
}