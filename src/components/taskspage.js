import React, { Component } from 'react'
import NewTask from './newtask'
import TaskList from './tasklist'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default class TasksPage extends Component {
    render() {
        console.log("TasksPage", this.props);
        return (
            <>
            <NewTask onCreateTask={ this.props.onCreateTask }/>
            <TaskList tasks={ this.props.tasks }/>
            </>
        );
    }
}
