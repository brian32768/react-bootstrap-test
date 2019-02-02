import React, { Component } from 'react'
import NewTask from './newtask'
import TaskList from './tasklist'

//<NewTask onCreateTask={ this.props.onCreateTask }/>
//<TaskList tasks={ this.props.tasks }/>

export default class TasksPage extends Component {
    render() {
        let theme = this.props.theme;
        console.log("TasksPage", this.props);
        return (
            <>
            tasks page
            </>
        );
    }
}
