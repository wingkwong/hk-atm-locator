import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App/App';
import LandingListView from './containers/Landing/LandingListView';

export default class Routes extends Component{
    render() {
        return (
            <div>
                <Route path='/' component={App(LandingListView)}/>
            </div>
        )
    }
}