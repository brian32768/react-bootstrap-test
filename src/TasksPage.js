import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import TaskList from './TaskList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default class TasksPage extends Component {
    state = {
        showForm: false,
        title: '',
        description: ''
    }
    resetForm() {
        this.setState({
            showForm: false,
            title: '',
            description: ''
        });
    }
    submit = (e) => {
        console.log("submit", e.target.value);
        e.preventDefault();
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description
        });
        this.resetForm();
    }
    //toggleForm(e) = (e) => {
    //}
    change = (e) => {
        const { target: {name, value} } = e;
        console.log("change", name, value);
        this.setState({
            [name]:value
        });
    }
    render() {
        console.log("TasksPage", this.props.tasks);
        return (
            <>
            <form onSubmit={ this.submit }>
            <input type="submit" value="+New task"/><br />
            <input name="title" placeholder="title" onChange={ this.change }/><br />
            <input name="description" placeholder="description" onChange={ this.change }/>
            </form>
            <TaskList tasks={ this.props.tasks }/>
            </>
        );
    }
}
