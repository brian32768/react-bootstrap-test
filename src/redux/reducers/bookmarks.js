import deepmerge from 'deepmerge'
import { actions, uniqueId } from '../actions'

const initialState = {
    bookmarks: {
        selected: 0,
        list: [{
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Rivendell",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Springfield",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Smallville",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Gotham City",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Metropolis",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Alphaville",
        	}, {
        	    id: uniqueId(),
        	    location: [-123,46],
        	    title: "Acropolis",
        	},
        ]
    }
};

const reducer = (state=initialState, action) => {
    let newstate;
    switch(action.type)  {
	case actions.ADD_BOOKMARK:
	    newstate = { bookmarks: {
            selected: state.bookmarks.selected,
            list: state.bookmarks.list.concat(action.payload)
        }};
	    break;
    case actions.SELECT_BOOKMARK:
        newstate = { bookmarks: {
            selected: action.payload.index,
            list: state.bookmarks.list
        }};
        break;
    case actions.NEXT_BOOKMARK:
        let n;
        if (isNaN(state.bookmarks.selected)) {
            n = 0;
        } else {
            n = state.bookmarks.selected + 1;
            if (n >= state.bookmarks.list.length) {
                // Don't change selection when we hit upper rail
                return state;
            }
        }
        newstate = { bookmarks: {
            selected: n,
            list: state.bookmarks.list
        }};
        break;
	default:
	    return state;
    }
    return newstate;
}

export default reducer
