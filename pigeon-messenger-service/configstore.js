import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers, compose  } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { page, search, theme } from './src/reducers'
import { errorReporter } from './src/middleware'
import routes from './routesMap'

// FIXME -- persistence insists on restoring whatever path was loaded
// even if the URL is a bookmark with a query attached
// ---- so I don't need persistence right now!

// This object defines where the storage lives,
// in this case, it's in local storage in your browser.
const persistConfig = {
    key: "root",
    storage,
}

export default function configureStore(preloadedState) {
    const { reducer, middleware, enhancer } = routes;
    const rootReducer =
//    persistReducer(persistConfig,
        combineReducers({
            search,
            theme,
            page,
            location  : reducer
        })
//    )
    const middlewares = applyMiddleware(middleware, errorReporter, logger)
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
    const enhancers = composeEnhancers(enhancer, middlewares)
    const store     = createStore(rootReducer, preloadedState, enhancers);

//    const persistor = persistStore(store, null, () => {console.log("rehydrationComplete")});
    const persistor=null

    return { store, persistor }
}
