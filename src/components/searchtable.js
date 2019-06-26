import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
        } catch (_) {  }
        // Something went wrong, update the response data with the API's usage overview, without changing route.
        console.error("thunk failed");
        dispatch({ type: 'SEARCH_FETCHED', payload: { } })
    }
}

const SearchTable = ({ results }) => {
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
    results: PropTypes.string
}
export default SearchTable
