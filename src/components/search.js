import React, { useState } from 'react'
import { connect } from 'react-redux'
import SearchTable from './searchtable'

const Search = () => {
    const [ query, setQuery ] = useState('')
    const handleQuery = (e) => {
        setQuery(e.target.value);
    }
    const results = query.length > 3? "" : "Give me something to search for.";

    return (
        <>
            <h3>Search</h3>
            <input type="text" onChange={handleQuery} value={query}/>

            <SearchTable results={results}/>
        </>
    )
}
export default Search
