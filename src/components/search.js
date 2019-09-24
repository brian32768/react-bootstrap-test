import React, {useState, useEffect, useContext} from 'react' // eslint-disable-line no-unused-vars
//import SearchTable from './searchtable' // eslint-disable-line no-unused-vars
import SolrQuery from './solr' // eslint-disable-line no-unused-vars

const Search = () => {
    const [query, setQuery] = useState('')
    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <h3>Search</h3>
            <input type="text" onChange={handleQuery} value={query}/>

            <SolrQuery query={query}/>
        </>
    )
}
export default Search
