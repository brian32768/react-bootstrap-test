import { actions } from './action-types'

export function addBookmark({ location, title }) {
    console.log("actions.addBookmark", location, title);
    return {
        type: actions.ADD_BOOKMARK,
        payload: {
            id: uniqueId(),
            location,
            title,
        },
    };
}
export function deleteBookmark( id ) {
    console.log("actions.deleteBookmark", id);
    return {
        type: actions.DELETE_BOOKMARK,
        payload: {
            id,
        },
    };
}
export function nextBookmark( ) {
    console.log("actions.nextBookmark");
    return {
        type: actions.NEXT_BOOKMARK,
        payload: {
        },
    };
}
export function selectBookmark( index ) {
    console.log("actions.selectBookmark", index);
    return {
        type: actions.SELECT_BOOKMARK,
        payload: {
            index,
        },
    };
}
