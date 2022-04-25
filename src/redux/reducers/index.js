import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import tasks from './tasks'
import theme from './theme'

export default combineReducers({
    tasks,
    theme,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
