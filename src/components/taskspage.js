import React from 'react'
import NewTask from './newtask'
import TaskList from './tasklist'

//<NewTask onCreateTask={ this.props.onCreateTask }/>
//<TaskList tasks={ this.props.tasks }/>

const TasksPage = (props) => (
    <>
        <NewTask />
        <TaskList />
    </>
);

export default TasksPage;
