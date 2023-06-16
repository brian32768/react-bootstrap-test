import React from 'react'
import { gql,useQuery } from '@apollo/client';
import { GET_INSTRUMENTS, PING } from './queries';

const ShowInstruments = ({ querytype, lastname }) => {
    const { loading, error, data } = useQuery(GET_INSTRUMENTS, {
        variables: {querytype,lastname}
    });
    if (error) return <p>Error : {error.message}</p>;
    if (loading) return <p>Loading...</p>;
  
    return data.instruments.map(({ id, firstname, lastname, recording_date }) => (
      <div key={id}>
        {id} {firstname} {lastname} {recording_date} <br />
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
            <h1>Apollo Client</h1>
            <ShowInstruments querytype="ALL" lastname="WARRENTON" />
            <Ping /><br />
        </div>
    )
}
export default Apollo
