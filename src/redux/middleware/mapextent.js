const DEFAULT_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const mapExtentMiddleware = store => {
    console.log('mapExtent middleware active');
    return next => action => {
        try {
            console.log('mapExtentMiddleware action', action);
            return next(action)
        } catch(err) {
            console.error('MapExtent Middleware Error', err)
            throw err
        }
    }
}

export default mapExtentMiddleware
