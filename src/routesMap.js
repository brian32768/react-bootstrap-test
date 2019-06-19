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

    // thunks can go here to download remote data asynchronously
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
