import { actions } from '../actions'
import { themes } from '../../themes'

const initialState = {
    theme: themes.dark,
}

export const themesReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.TOGGLE_THEME:
            const theme = state.theme;
            return { theme: (theme.name==='dark')?
                                themes.light : themes.dark };
    }
    return state;
}
