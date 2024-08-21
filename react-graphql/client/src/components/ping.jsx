//
// Ping the API server to make sure it's alive.
//
import React, {useState, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import axios from "axios"

import { AppSettings } from '../config'

const Ping = () => {
    const [ status, setStatus ] = useState(1);
    const [ pinged, setPinged ] = useState("not ready");

    useEffect( () => {  
        async function ping() {
            const cmd = AppSettings.SERVER + "ping";
            try {
                const response = await axios.get(cmd);
                setPinged("data server ready " + response.data.response)
                console.log(response);
                setStatus(1);
            } catch (err) {
                setPinged(
                    <>
                    Ping failed. <b>{err.message}</b>
                    </>
                );
                setStatus(0);                
                console.log('Ping failed ' + cmd)
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
            <font color={status?"purple":"red"}>{pinged}</font>
        </>
    )
}
export default Ping