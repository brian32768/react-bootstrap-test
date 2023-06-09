import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_INSTRUMENTS = gql`
  query GetInstruments {
    instruments {
      id
      firstname
      lastname
    }
  }
`;

function DisplayInstruments() {
    const { loading, error, data } = useQuery(GET_INSTRUMENTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    return data.instruments.map(({ id, firstname, lastname }) => (
      <div key={id}>
        <h3>{firstname} {lastname}</h3>
        <br />
      </div>
    ));
  }

const Apollo = () => {
    return (
        <div>
        <h1>Apollo</h1>
        <DisplayInstruments />
        </div>
    )
}
export default Apollo
