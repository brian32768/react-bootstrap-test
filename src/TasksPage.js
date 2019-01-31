import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import TaskList from './TaskList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default class TasksPage extends Component {
    state = {
        title: '',
        description: ''
    }
    change = (e) => {
        console.log("change", e.target.value);
    }
    submit = (e) => {
        console.log("submit", e.target.value);
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
