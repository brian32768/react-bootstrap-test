import React, { useContext } from 'react'
import { UserContext } from '../usercontext.js';

const MyForm = (props) => {
    let { username, setUsername } = useContext(UserContext);

    const onSubmit = (e) => {
        // This is not working yet but I don't care 
        // since I never use uncontrolled forms any more.
        const name = window.name.value;
        console.log(`onSubmit(${name})`);
        setUsername(name);
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
                    <input id="name" required/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    ); 
}
export default MyForm;
