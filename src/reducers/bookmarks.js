import deepmerge from 'deepmerge'
import { actions, uniqueId } from '../actions'

const initialState = {
    1 : { title: "Astoria", location: [-123.836,46.182], zoom: 13 },
	2 : { title: "Cannon Beach", location: [-123.969,45.893], zoom: 13 },
    3 : { title: "Gearhart", location: [-123.9188,46.026], zoom: 13 },
    4 : { title: "Hammond", location: [-123.9520,46.2000], zoom: 14 },
    5 : { title: "Jewell", location: [-123.5032,45.9345], zoom: 14 },
    6 : { title: "Seaside", location: [-123.920,45.994], zoom: 12 },
    7 : { title: "Warrenton", location: [-123.924,46.165], zoom: 13 },
};

export const bookmarks = (state=initialState, action) => {
    switch(action.type)  {
	case actions.ADD_BOOKMARK:
	    return state.bookmarks.concat(action.payload);
    }
    return state;
}
