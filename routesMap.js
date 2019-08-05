import { connectRoutes } from 'redux-first-router'
import queryString from 'query-string'

const routesMap = {
    HOME:     '/',
    MAP:      '/map',
    TABLE:    '/table',
    PICTURES: '/pictures',
    SEARCH:   '/search',
    ABOUT:    '/about',
    CONTACT:  '/contact',

    // thunks can be added to routes to download remote data asynchronously
/*
    // Below is a _pathless_ route! Despite being defined in routesMap, it's not connected to the route,
    // but is supported in order to have a uniform thunk interface even when routes are not involved.
    // Defining all "setup" actions this way helps structure the app and reduce Redux boilerplate.
    SEARCH_HELP: {
        thunk: async (dispatch, getState) => {
            const action = { type: 'SEARCH_FETCHED', payload: { hasError: true } };
            try {
                const response = await fetch('https://swapi.co/api/')
                action.payload.data = response.ok ? await response.json() : `Status: ${response.status}`
            } catch (error) {
                action.payload.data = `Error: ${error.message}`
            }
            dispatch(action)
        }
    }
*/
    /*

    I stuck this code here for the moment while it seeks a new Home

            const xmlfile = "https://maps.wildsong.biz/wps_buffer_request.xml";
            const wps_service_url = "https://geoserver.wildsong.biz/"

    //        console.log("Load this xml file thing", xmlfile)
            axios.get(xmlfile)
            .then( (response) => {
    //            console.log("I read your file for you", response);
                // Now send it right on back to the WPS server
                axios({
                    method: 'post',
                    url: wps_service_url,
                    data: xmlfile
                })
                .then ( (response) => {
                    console.log("Binky", response);
                })
                .catch ( (error) => {
                    console.log("Sorry POST failed");
                })
            })
            .catch( (error) => {
    //            console.log("Sorry I could not read your file");
            })
            */
}
export default connectRoutes(routesMap, {
    querySerializer: queryString // This is what puts your queries into the address bar.
    //createHistory,  You can add "createHistory" here but it's not necessary
})
