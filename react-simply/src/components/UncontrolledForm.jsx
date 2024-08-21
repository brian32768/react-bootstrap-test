import { Form, Button } from "react-bootstrap"

const MyForm = (props) => {
    const onSubmit = (e) => {
        console.log('Submitted', window.firstname.value);
        props.setFirstname(window.firstname.value);
        e.preventDefault();
    }
    return (
        <>
            <h1>Uncontrolled Form</h1>
            This is an example of an uncontrolled form.
            "Uncontrolled" means it's managed by the DOM not by the React code.
            
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="firstname">
                    <Form.Label>Name</Form.Label> 
                    <Form.Control type="string" required/>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </>
    ); 
}
export default MyForm;
