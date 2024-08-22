import React from 'react';
import { connect } from 'react-redux'

const Solr = ({ data, hasError, query }) => {
  const title = !data ? `Solr: Searching for ${query}...` : `SOLR: ${query}`;
  const hint = <small><em>(Hint: Don't try people/1/ or planets/3/ or starships/9/)</em></small>
  return (
  <div>
    <h3>{title}</h3>
    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    {hasError && hint}
  </div>
  )
}

const mapStateToProps = ({ location: { payload }, solr: { data, hasError }}) => ({
  data,
  hasError,
  query: `${payload.query}`
})

export default connect(mapStateToProps)(Solr)
