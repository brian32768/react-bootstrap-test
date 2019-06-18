import logger from 'redux-logger'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import { devToolsEnhancer } from 'redux-devtools-extension'

import { page, bookmarks, map, tasks, theme } from './reducers'
import { mapMiddleware, errorReporter } from './middleware'
import routes from './routesMap'

// This object defines where the storage takes place,
// in this case, it's in local storage in your browser.
const persistConfig = {
    key: "root",
    storage,
}

export default function configureStore(preloadedState) {
    const { reducer, middleware, enhancer } = routes;
    const rootReducer = persistReducer(persistConfig,
        combineReducers({
            page,
            bookmarks,
            map,
            tasks,
            theme,
            location  : reducer
        })
    );
    const middlewares = applyMiddleware(middleware, mapMiddleware, errorReporter, logger)
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
    const enhancers = composeEnhancers(enhancer, middlewares)
    const store     = createStore(rootReducer, preloadedState, enhancers);
    const persistor = null; //persistStore(store, null, () => {console.log("rehydrationComplete")});

    return { store, persistor }
}
