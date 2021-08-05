import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

// internal modules
import '../assets/stylesheets/application.scss';
import GenesetsIndex from './containers/genesets_index';
import GenesetsNew from './containers/genesets_new';
import GenesetsUpdate from './containers/genesets_update';

// State and reducers
import genesetsReducer from './reducers/genesets_reducer';
import genesetReducer from './reducers/geneset_reducer';


const initialState = {
  genesets: [],
  geneset: null
}

const reducers = combineReducers({
  genesets: genesetsReducer,
  geneset: genesetReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(reduxPromise, logger));

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={GenesetsIndex}/>
        <Route path="/genesets/new" exact component={GenesetsNew}/>
        <Route path="/genesets/update/:id" component={GenesetsUpdate}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
