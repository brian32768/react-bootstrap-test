//
// Ping the API server to make sure it's alive.
//
import React, {useState, useContext, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import axios from "axios"

import { AppSettings } from '../config'

const Ping = () => {
    const [ status, setStatus ] = useState(1);
    const [ pinged, setPinged ] = useState( "not ready") );

    useEffect( () => {  
        async function ping() {
            try {
                const response = await axios.get(AppSettings.SERVER + "ping");
                setPinged("data server ready at " + response.data.response)
                console.log(response);
                setStatus(1);
            } catch (err) {
                setPinged("server error: " + err.message)
                setStatus(0);                
            }
        }
/*
        setTimeout( () => {
            setPinged("Hiya, time for a greeting.");
            console.log("here we are")
        }, 5000);
*/
        ping();
    }, []); // run one time, on mount
 
    return (
        <>
            <font color={status?"green":"red"}>{pinged}</font>
        </>
    )
}
export default Ping