const errorReporter = store => {
    console.log('error reporting active')
    return next => action => {
        try {
            return next(action)
        } catch(err) {
            console.error('Middleware Error', err)
            throw err
        }
    }
}
export default errorReporter
