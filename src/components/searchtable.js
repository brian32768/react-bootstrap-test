import React, {useState,useEffect,useContext} from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

const runQuery = () => {
    async (dispatch, getState) => {
        const { query } = getState().location.payload
        const url = `https://solr.wildsong.biz/solr/taxlots/select?${query}`
        console.log("query",query);
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                // Note that only one action is required, since fetching is triggered by the router.
                dispatch({ type: 'SEARCH_FETCHED', payload: { data } })
                return
            }
        } catch (error) {
        }
        // Something went wrong, update the response data with the API's usage overview, without changing route.
        console.error("thunk failed");
        dispatch({ type: 'SEARCH_FETCHED', payload: { } })
    }
}

const SearchTable = ({query}) => {
    const [results, setResults] = useState();

    useEffect(() => {
        if (query.length < 3) return;
        setResults(query);
    }, [query]);

    return (
        <>
            <h4>Search Results</h4>

            <p>
            { results }
            </p>
        </>
    )
}
SearchTable.propTypes = {
    query: PropTypes.string
}
export default SearchTable
