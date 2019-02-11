import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import bookmarks from './bookmarks'
import mapExtent  from './mapextent'
import tasks from './tasks'
import theme from './theme'

export default combineReducers({
    bookmarks,
    mapExtent,
    tasks,
    theme,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
