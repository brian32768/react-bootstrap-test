import React, { useState } from 'react'
import { connect } from 'react-redux'

const Search = () => {
    [ query, setQuery ] = useState('')
    const handleQuery = (e) => {
        setQuery(e.target.value);
    }
    return (
        <>
            <h3>Search</h3>
            <input type="text" onChange={handleQuery} value={query}/>
        </>
    )
}
export default Search
