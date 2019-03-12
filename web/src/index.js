import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer);

ReactDOM.render(< Root store = {
    store
}/>, document.getElementById('root'))