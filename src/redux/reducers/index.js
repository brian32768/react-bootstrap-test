import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { bookmarksReducer } from './bookmarks'
import { mapextentReducer }  from './mapextent'
import { tasksReducer } from './tasks'
import { themesReducer } from './theme'

// this is for connected-react-router v5/6
export default (history) => combineReducers({
    router: connectRouter(history),
    bookmarks : bookmarksReducer,
    mapExtent : mapextentReducer,
    tasks : tasksReducer,
    themes : themesReducer,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
