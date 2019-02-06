import { themes } from '../../themes'

const initialState = {
    theme: themes.dark,
}

const reducer = (state=initialState, action) => {
    let theme = state.theme;
    let newstate;
    switch(action.type) {
        case 'TOGGLE_THEME':
            newstate = { theme: (theme.name==='dark')?
                                themes.light : themes.dark };
            break;
        default:
            newstate = state;
    }
    return newstate;
}

export default reducer
