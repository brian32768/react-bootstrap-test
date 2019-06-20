import React from 'react';
import { connect } from 'react-redux'

const Swapi = ({ data, hasError, query }) => {
    const title = !data ? `SWAPI: Loading ${query}...` : `SWAPI: ${query}`;
    const hint = <small><em>(Hint: try people/1/ or planets/3/ or starships/9/)</em></small>
    return (
        <>
            <h3>{title}</h3>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {hasError && hint}
        </>
    )
}
const mapStateToProps = ({ location: { payload }, swapi: { data, hasError }}) => ({
    data,
    hasError,
    query: `${payload.type}/${payload.id}`
})
export default connect(mapStateToProps)(Swapi)
