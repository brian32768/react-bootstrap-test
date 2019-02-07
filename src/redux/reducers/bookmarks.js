import deepmerge from 'deepmerge'
import { actions, uniqueId } from '../actions'

const initialState = {
    bookmarks: {
        selected: 0,
        list: [{
        	    id: uniqueId(),
        	    location: [-12,46],
                zoom: 10,
        	    title: "Astoria",
        	}, {
        	    id: uniqueId(),
        	    location: [123,46],
                zoom: 14,
        	    title: "Gearhart",
        	}, {
        	    id: uniqueId(),
        	    location: [-23,46],
                zoom: 13,
        	    title: "Cannon Beach",
        	}, {
        	    id: uniqueId(),
        	    location: [123,6],
                zoom: 7,
        	    title: "Jewell",
        	}, {
        	    id: uniqueId(),
        	    location: [-13,46],
                zoom: 10,
        	    title: "Seaside",
        	}, {
        	    id: uniqueId(),
        	    location: [13,46],
                zoom: 11,
        	    title: "Hammond",
        	}, {
        	    id: uniqueId(),
        	    location: [-121,46],
                zoom: 19,
        	    title: "Warrenton",
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
