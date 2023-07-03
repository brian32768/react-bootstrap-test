import { useState } from 'react'
import { Button } from 'react-bootstrap'

const MyForm = (props: { onLogin: (arg0: any) => void; }) => {
    const [ firstname, setFirstname ] = useState("Brian");
    const onSubmit = (e) => {
        console.log('Submit');
        props.onLogin(firstname);
        e.preventDefault();
    }
    const onChangeFirst = (e) => {
        setFirstname(e.target.value);
        console.log(`onChangeFirst(${firstname})`)
    }
    return (
        <>
            <h1>MyForm</h1>
            This is from the MyForm component.
            <form onSubmit={onSubmit}>
                <label>First name
                <input value={firstname} onChange={onChangeFirst}/>
                </label>
                <Button onClick={onSubmit}>Log in</Button>
            </form>
        </>
    ); 
}
export default MyForm;
