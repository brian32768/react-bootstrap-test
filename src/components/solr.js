import React from 'react';
import { connect } from 'react-redux'

const Solr = ({ data, hasError, query }) => {
    const title = !data ? `SOLR: Loading ${query}...` : `SOLR: ${query}`;
    const hint = <small><em>(Hint: don't try people/1/ or planets/3/ or starships/9/)</em></small>
    return (
        <>
            <h3>{title}</h3>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {hasError && hint}
        </>
    )
}
const mapStateToProps = ({ location: { payload }, solr: { data, hasError }}) => ({
    data,
    hasError,
    query: `${payload.query}`
})
export default connect(mapStateToProps)(Solr)
