import React, { Component } from 'react'

export default class TaskList extends Component {
    render() {
        console.log("TaskList", this.props);
        return (
            <>
            <h2>tasks</h2>
            <ol>
            { this.props.tasks.map(t =>
                <li key={ t.id }>{ t.title } - { t.description }</li>
            )}
            </ol>
            </>
        );
    }
}
