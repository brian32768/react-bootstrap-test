import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import bookmarks from './bookmarks'
import position from './position'
import tasks from './tasks'
import theme from './theme'

export default combineReducers({
    bookmarks,
    position,
    tasks,
    theme,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
