import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Root from './containers/Root/Root';
import rootReducer from './reducers';
import css from './static/main.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(< Root store = {
    store
}/>, document.getElementById('root'))