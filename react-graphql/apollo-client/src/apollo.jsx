import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_INSTRUMENTS = gql`
    query GetInstruments($searchtype: Enum, $lastname: String!) {
        instruments(searchtype: $searchtype, lastname: $lastname) {
            id
            firstname
            lastname
        }
    }
`;

const PING = gql`
    query Ping {
        ping
    }
`;

const DisplayInstruments = ({ searchtype, lastname }) => {
    const { loading, error, data } = useQuery(GET_INSTRUMENTS,
        {variables: searchtype, lastname}
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    return data.instruments.map(({ id, firstname, lastname }) => (
      <div key={id}>
        <h3>{firstname} {lastname}</h3>
        <br />
      </div>
    ));
}

const Ping = () => {
    const { loading, error, data } = useQuery(PING);
    if (loading) return <>Server starting up...</>;
    if (error) return <>Connect failed: {error.message}</>;
    const ping = "Freddo";
    return (
        <font color="lightgrey">{data.ping}</font>
    );
}

const Apollo = () => {
    return (
        <div>
            <h1>Apollo</h1>
            <DisplayInstruments lastname="WILSON" />
            <Ping /><br />
        </div>
    )
}
export default Apollo
