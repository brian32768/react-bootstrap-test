import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRoutes } from 'redux-first-router'

import routesMap from './routesMap'
import page from './pageReducer'
import swapi from './swapiReducer'
import solr from './solrReducer'

export default function configureStore(preloadedState) {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap)

  const rootReducer = combineReducers({ page, swapi, solr, location: reducer })
  const middlewares = applyMiddleware(middleware)
  const enhancers = compose(enhancer, middlewares)

  const store = createStore(rootReducer, preloadedState, enhancers)

  return { store }
}
