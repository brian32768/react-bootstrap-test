import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { bookmarksReducer } from './bookmarks'
import { mapExtentReducer }  from './mapextent'
import { tasksReducer } from './tasks'
import { themeReducer } from './theme'

// this is for connected-react-router v5/6
export default (history) => combineReducers({
    router: connectRouter(history),
    bookmarks : bookmarksReducer,
    mapExtent : mapExtentReducer,
    tasks : tasksReducer,
    theme : themeReducer,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
