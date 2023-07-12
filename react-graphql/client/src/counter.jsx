/**
 * Test for Apollow mutations, just increments a counter in the back end.
 */
import { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { Button } from "react-bootstrap"
import { INCREMENT_COUNTER } from "./queries"

const Counter = () => {
    const [incrementCounter, {data,loading,error}] = useMutation(INCREMENT_COUNTER);

    const increment = () => {
        console.log('Increment');
        incrementCounter();
    }

    if (loading) return <>Server starting up...</>;
    if (error) return <>Connect failed: {error.message}</>;
    const counter = data? data.incrementCounter : 0;

    return (
        <>
           <Button onClick={increment}>{counter}</Button>
        </>
    );

}
export default Counter;
