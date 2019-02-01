import React, { Component } from 'react'
import NewTask from './newtask'
import TaskList from './tasklist'

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
