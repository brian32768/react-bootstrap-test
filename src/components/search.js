import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import SearchTable from './searchtable'; // eslint-disable-line no-unused-vars

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
