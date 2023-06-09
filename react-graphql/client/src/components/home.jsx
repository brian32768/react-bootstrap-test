import React, {useState, useEffect, Suspense}  from 'react';   // eslint-disable-line no-unused-vars

import {graphql, useQueryLoader, usePreloadedQuery } from 'react-relay'

const AppQuery = graphql`
    query AppQuery($id: ID!) {
        instrument(id: $id) {
            firstname,
            lastname
        }
}`;

const queryReference = loadQuery(
    myEnvironment,
    query,
    { id: '123'},
    {fetchPolicy: 'store-or-network'}
);


const Home = () => {
    return (
        <>
        <h1>Home</h1>
        
        <Button 
            onCLick={() => loadQuery({id: '123'})}
            disabled={queryReference != null}
        >do query</Button>
        <Suspense>
            {queryReference != null?
                <NameDisplay queryReference={queryReference} />
                : null
            }
        </Suspense>
        </>
    );
}

const NameDisplay = ({queryReference}) => {
    const hello = usePreloadedQuery(AppQuery, queryReference);
    return (
        <h1>Hello, {hello.instrument?.firstname}</h1>
    )
}
export default Home;
