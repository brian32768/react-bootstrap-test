import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { routerReducer } from './router'
import { bookmarksReducer } from './bookmarks'
import { mapReducer }  from './map'
import { tasksReducer } from './tasks'
import { themeReducer } from './theme'

export default (history) => combineReducers({
    bookmarks : bookmarksReducer,
    map : mapReducer,
    tasks : tasksReducer,
    theme : themeReducer,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
