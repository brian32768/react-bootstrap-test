import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../actions'
import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button} from 'reactstrap'

const NewTask = ({ tasks, createTask, theme}) => {
    const [showForm, setShowForm] = useState(true);
    const [title, setTitle] = useState('new task');
    const [description, setDescription] = useState('new description');
    const toggleShowForm = (state) => { return !state };
    const addTitle = () => {};
    const addDescription = () => {};
    const resetForm = () => {}
    const submit = (e) => {
        e.preventDefault();
        console.log("NewTask.submit",e);
        addTask({
            title: this.state.title,
            description: this.state.description
        });
        resetForm();
    }

    const change = (e) => {
        const { target: {name, value} } = e;
    }

    const inverse = (theme.name === "dark");

    return (
        <Card inverse={inverse} style={{backgroundColor: theme.background}}>
            <CardBody>
                <input className="input" name="title" placeholder="title" onChange={ change } value={ title }/><br />
                <input className="input" name="description" placeholder="description" onChange={ change } value={ description }/>
                <div className="button-align">
                    <Button onClick={ submit }>add task</Button>
                </div>
            </CardBody>
        </Card>
    );
}
NewTask.propTypes = {
    theme: PropTypes.object,
    tasks: PropTypes.object
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        theme: state.theme,
        tasks: state.tasks
    };
}
const mapDispatchToProps = {
    addTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
