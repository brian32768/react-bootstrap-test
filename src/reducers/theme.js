import { actions } from '../actions'
import { themes } from '../themes'

const initialState = themes.dark;

export const theme = (state=initialState, action) => {
    //console.log("theme reducer", action, state);
    switch(action.type) {
        case actions.TOGGLE_THEME:
            const oldTheme = state;
            return (oldTheme.name==='dark')? themes.light : themes.dark;
    }
    return state;
}
