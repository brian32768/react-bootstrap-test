import React, { Component } from 'react'

export default class TaskList extends Component {
    render() {
        console.log("TaskList", this.props);
        return (
            <>
            a list of tasks
            </>
        );
    }
}
