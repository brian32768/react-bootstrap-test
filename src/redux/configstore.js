import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createRootReducer from './reducers'
import { loggerMiddleware, errorMiddleware } from './middleware'

// This object defines where the storage takes place,
// in this case, it's in local storage in your browser.
const persistConfig = {
    key: "root",
    storage,
}

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, createRootReducer)

export const history = createBrowserHistory()

export default (preloadedState) => {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        enhancedCompose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                errorMiddleware,
                logger
            )
        )
    );
    const persistor = persistStore(store)
    return { store, persistor }
}
