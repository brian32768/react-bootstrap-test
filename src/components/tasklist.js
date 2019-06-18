import React from 'react'
import { connect } from 'react-redux'

const TaskList = ({ tasks }) => (
    <>
        <h2>Tasks</h2>
        <ol>
        { tasks.map(t =>
            <li key={ t.id }>{ t.title } - { t.description }</li>
        )}
        </ol>
    </>
);
TaskList.propTypes = {
//    tasks: PropTypes.listOf(
}
const mapStateToProps = (state) => ({
    tasks: state.tasks
});
export default connect(mapStateToProps)(TaskList);
