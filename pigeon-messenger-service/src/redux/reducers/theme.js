import { actions } from '../actions'
import { themes } from '../../themes'

const initialState = {
    theme: themes.dark,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.TOGGLE_THEME:
            const theme = state.theme;
            return { theme: (theme.name==='dark')?
                                themes.light : themes.dark };
    }
    return state;
}

export default reducer
