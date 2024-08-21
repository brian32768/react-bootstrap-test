import React, { useContext, useState } from 'react';
import { UserContext } from '../usercontext.js';
import { Button } from 'react-bootstrap';

const ControlledForm = () => {
    const { username, setUsername } = useContext(UserContext);
    const [ name, setName ] = useState('');
    const [ haveInput, setHaveInput ] = useState(username?1:0);

    const instructions = "This is an example of a controlled form. \
            As you type, the state of the component changes. \
            The state change is pushed up to the parent right away. \
            Technically you don't always need a \"submit\" button.";
    const more_instructions = " In this example, when you \
            click \"Log in\" the name \
            will get copied to the top bar of the app.";
    const onSubmit = (e) => {
        console.log(`onSubmit(${name})`)
        setUsername(name)
        e.preventDefault();
    }
    const onChange = (e) => {
        setName(e.target.value);
        setHaveInput(name?1:0);
        console.log(`onChange(${name})`)
    }
    return (
        <>
            <h1>Controlled Form</h1>

            { haveInput? (`You are typing "${name}".` +more_instructions) : instructions }

            <form onSubmit={onSubmit}>
                <label>Name
                <input value={name} onChange={onChange}/>
                </label>
                <Button onClick={onSubmit}>Log in</Button>
            </form>
        </>
    ); 
}
export default ControlledForm;
