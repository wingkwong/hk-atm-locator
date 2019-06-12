import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ATMLandingContainer from './containers/Landing/ATMLandingContainer';
import ATMDetailContainer from './containers/ATMDetailContainer/ATMDetailContainer';
import ATM404Container from './containers/ATM404Container/ATM404Container';

export default class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ATMLandingContainer}/>
                <Route path='/atm/:id' component={ATMDetailContainer}/>
                <Route component={ATM404Container} />
            </Switch>
        )
    }
}