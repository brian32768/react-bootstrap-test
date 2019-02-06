import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import counter from './counter'
import tasks from './tasks'
import theme from './theme'

export default combineReducers({
    counter,
    tasks,
    theme,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
