import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Landing from './containers/Landing/Landing';

export default class Routes extends Component{
    render() {
        return (
            <div>
                <Route path='/' component={Landing} />
            </div>
        )
    }
}