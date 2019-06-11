import { push, replace } from 'connected-react-router'

const DEFAULT_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const mapExtentMiddleware = store => {
    console.log('mapExtent middleware active');
    return next => action => {
        try {
            switch (action.type) {
                case DEFAULT_LOCATION_CHANGE:
                    console.log('mapExtentMiddleware action', action);
                    // perhaps I can do a replace here?
                    break;
                default:
                    console.log('uh mapExtentMiddleware action', action);
                    break
            }
            return next(action)
        } catch(err) {
            console.error('MapExtent Middleware Error', err)
            throw err
        }
    }
}

export default mapExtentMiddleware
