import React, { Component } from 'react'
import { connect } from 'react-redux'

const TaskList = (props) => (
    <>
        <h2>Tasks</h2>
        <ol>
        { props.tasks.map(t =>
            <li key={ t.id }>{ t.title } - { t.description }</li>
        )}
        </ol>
    </>
);

const mapStateToProps = (state) => ( state.tasks );
export default connect(mapStateToProps)(TaskList);
