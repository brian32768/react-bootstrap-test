<<<<<<< HEAD:react-simply/src/components/UncontrolledForm.tsx
import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const MyForm = (props: {firstname: string, setFirstname: CallableFunction}) => {
    const onSubmit = (e) => {
        console.log('Submit');
        props.setFirstname(window.firstname.value);
        e.preventDefault();
    }
    return (
        <>
            <h1>Uncontrolled Form</h1>
            This is an example of an uncontrolled form.
            They are managed by the DOM not by the React code.
            
            <form onSubmit={onSubmit}>
                <label>
                    Name 
                    <input id="firstname" required/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    ); 
}
export default MyForm;
=======
export const UncontrolledForm = (props) => {
    const onSubmit = (e) => {
        console.log('Submit');
        props.setFirstname(window.firstname.value);
        e.preventDefault();
    }
    return (
        <>
            <h1>Uncontrolled Form</h1>
            This is an example of an uncontrolled form.
            They are managed by the DOM not by the React code.
            
            <form onSubmit={onSubmit}>
                <label>
                    Name 
                    <input id="firstname" required/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    ); 
}

>>>>>>> refs/remotes/origin/master:preact-simply/src/routes/UncontrolledForm.jsx
