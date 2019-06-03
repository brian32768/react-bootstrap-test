import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { devToolsEnhancer } from 'redux-devtools-extension'
import bookmarks from './bookmarks'
import mapExtent  from './mapextent'
import tasks from './tasks'
import theme from './theme'

// this is for connected-react-router v5/6
export default (history) => combineReducers({
    router: connectRouter(history),
    bookmarks,
    mapExtent,
    tasks,
    theme,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
