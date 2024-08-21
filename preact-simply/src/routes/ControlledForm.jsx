<<<<<<< HEAD:react-simply/src/components/ControlledForm.tsx
import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const ControlledForm = (props: { onLogin: CallableFunction }) => {

    // Every time we reload this form, the name field is empty
    const [ firstname, setFirstname ] = useState('');
    const [ haveInput, setHaveInput ] = useState(0);

    const instructions = "This is an example of a controlled form. \
            As you type, the state of the component changes. \
            The state change is pushed up to the parent right away. \
            Technically you don't always need a \"submit\" button.";
    const more_instructions = " In this example, when you \
            click \"Log in\" the name \
            will get copied to the top bar of the app.";
    const onSubmit = (e) => {
        console.log('Submit');
        props.onLogin(firstname); // Send the input up to the parent
        e.preventDefault();
    }
    const onChangeFirst = (e) => {
        setFirstname(e.target.value);
        setHaveInput(firstname?1:0);
        console.log(`onChangeFirst(${firstname})`)
    }
    return (
        <>
            <h1>Controlled Form</h1>

            { haveInput? ("You are typing this: " +firstname +more_instructions) : instructions }

            <form onSubmit={onSubmit}>
                <label>Name
                <input value={firstname} onChange={onChangeFirst}/>
                </label>
                <Button onClick={onSubmit}>Log in</Button>
            </form>
        </>
    ); 
}
export default ControlledForm;
=======
import { useState } from 'preact/hooks'

export const ControlledForm = (props) => {

    // Every time we reload this form, the name field is empty
    const [ firstname, setFirstname ] = useState('');
    const [ haveInput, setHaveInput ] = useState(0);

    const instructions = "This is an example of a controlled form. \
            As you type, the state of the component changes. \
            The state change is pushed up right away. \
            Technically you don't need any \"submit\" button.";

    const onSubmit = (e) => {
        console.log('Submit');
        props.onLogin(firstname); // Send the input up to the parent
        e.preventDefault();
    }
    const onChangeFirst = (e) => {
        setFirstname(e.target.value);
        setHaveInput(firstname?1:0);
        console.log(`onChangeFirst(${firstname})`)
    }
    return (
        <>
            <h1>Controlled Form</h1>

            { haveInput? ("You are typing this: "+firstname) : instructions }

            <form onSubmit={onSubmit}>
                <label>Name
                <input value={firstname} onChange={onChangeFirst}/>
                </label>
                <button onClick={onSubmit}>Log in</button>
            </form>
        </>
    ); 
}
>>>>>>> refs/remotes/origin/master:preact-simply/src/routes/ControlledForm.jsx
