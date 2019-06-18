import { connectRoutes } from 'redux-first-router'
import queryString from 'query-string'

const routesMap = {
    HOME:     '/',
    MAP:      '/map',
    TABLE:    '/table',
    PICTURES: '/pictures',
    ABOUT:    '/about',
    CONTACT:  '/contact',
    TASKS:    '/tasks',

    [NOT_FOUND]: 'NotFound'
}

export default connectRoutes(routesMap, {
  querySerializer: queryString // This is what puts your queries into the address bar.
})
