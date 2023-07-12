import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_INSTRUMENTS, PING } from './queries'
import DropZone from './dropzone'

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
            
            <DropZone/>

            Query the database:
            <ShowInstruments querytype="EXACT" lastname="KEISTER" />
            Ping: <Ping /><br />
        </div>
    )
}
export default Apollo
