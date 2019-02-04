import {combineReducers} from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import counter from './counter'
import tasks from './tasks'
import themes from './themes'

export default combineReducers({
    counter,
    tasks,
    themes,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
