import { useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Calendar, DateRangePicker } from 'react-date-range'
import Tippy from '@tippyjs/react';

import "react-datepicker/dist/react-datepicker.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'tippy.js/dist/tippy.css'; // optional


const ControlledForm = (props) => {

    // Every time we reload this form, the name field is empty

    const [ firstname, setFirstname ] = useState('');
    const [ haveInput, setHaveInput ] = useState(0);

    const oldest = new Date('1998/01/01').toLocaleDateString();
    const today = new Date().toLocaleDateString();

    // For the react-datepicker
    const [startDate, setStartDate] = useState(new Date('1998/1/1'));
    const [endDate, setEndDate] = useState(new Date());

    // for the react-date-range picker
    const selectionRange = {
        startDate: new Date('1998/1/1'),
        endDate: new Date(),
        key: 'selection',
    }

    // For the react-bootstrap date pickers
    const [ start, setStart ] = useState(oldest);
    const [ end, setEnd ] = useState(today);
    const [ haveDateRange, setHaveDateRange ] = useState(0)
    const dateHint = "no date range has been set yet";
    
    const [buttonTip, setButtonTip] = useState("Enter your name first.");

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
        setButtonTip((e.target.value.length > 0)
            ?" Click me to log in!" 
            : "Enter your name, then click here."
        )
    }

    const onChangeStart = (e) => {
        setStart(e.target.value);
        setHaveDateRange(1);
        console.log("start changed", start)
    }

    const onChangeEnd = (e) => {
        setEnd(e.target.value);
        setHaveDateRange(1);
        console.log("end changed",end)
    }

    const onChangeRange = (e) => {
/*        setEnd(e.target.value);
        setHaveDateRange(1);
        */
        console.log("range changed",e.target)
    }

    const showrange = start + ' - ' + end;

    return (
        <Container>
            <Row>
                <Col>
                <h1>Controlled Form</h1>
                { haveInput? ("You are typing this: "+firstname) : instructions }
                </Col>
            </Row>
            <Form>
                <Row>
                <Form.Group as={Col} controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>

                    <Tippy content="Type your name here!">
                    <Form.Control type="string" value={firstname} onChange={onChangeFirst}/>
                    </Tippy>

                    <Tippy content={buttonTip}>
                    <Button variant="primary" onClick={onSubmit}>Log in</Button>
                    </Tippy>
                </Form.Group>
                </Row>

                <Row>
                    <h3>react-bootstrap form control</h3>
    It's possible to use the built-in react-bootstrap date picker with "Form.Control" of
type "date", but react-bootstrap does not support enough of the options
to make it pretty. Here is an example.

                <InputGroup>
                <Form.Group as={Col}>
                    <Form.Label>Start <b>{start}</b> End <b>{end}</b></Form.Label>
                    <Form.Control type="date" min="1998-01-01" onChange={onChangeStart} value={start}/>
                    <Form.Control type="date" onChange={onChangeEnd} value={end}/>
                </Form.Group>
                </InputGroup>

This is the <a href="https://github.com/Hacker0x01/react-datepicker">react-date-picker</a> component.
<br/>
                </Row>

                <Row>
                <h3>react-datepicker control</h3>

                <InputGroup>
                <Form.Group as={Col}>
                    <Form.Label>Start</Form.Label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>End</Form.Label>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </Form.Group>
                </InputGroup>
                </Row>

                <Row>
                    <h3>DateRangePicker</h3>
This is the <a href="https://github.com/hypeserver/react-date-range">react-date-range</a> component.
It looks nice but I am not sure how to actually use it.<br/>

                <DateRangePicker  as={Col}
                ranges={[selectionRange]} onChange={onChangeRange}
                minDate={new Date('1998-01-01')}
                showMonthAndYearPickers={true}
                months={2}
                />
                </Row>
            </Form>
        </Container>
    ); 
}
export default ControlledForm;
