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

