import React, { Component } from 'react'
import { Route, Layout } from 'react-router-dom';
import App from './containers/App/App';
import Landing from './containers/Landing/Landing';

export default class Routes extends Component{
    render() {
        return (
            <div>
                <Route path='/' component={App}/>
                <Route path='/map' component={Landing} />
            </div>
        )
    }
}