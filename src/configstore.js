import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mapMiddleware, errorMiddleware } from './middleware'
import { createBrowserHistory } from 'history'
import combinedReducer from './reducers'

export const history = createBrowserHistory();

// This object defines where the storage takes place,
// in this case, it's in local storage in your browser.
const persistConfig = {
    key: "root",
    storage,
}

export default function configureStore(preloadedState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //const reducer = persistReducer(persistConfig, combinedReducer(history));
    const reducer = combinedReducer(history);

    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancer( applyMiddleware(
            //routerMiddleware,
            mapMiddleware,
            errorMiddleware,
            logger
    )));
//    const persistor = persistStore(store, null,
//        () => {console.log("rehydrationComplete")}
//    );
    const persistor = null;

    return { store, persistor }
}
