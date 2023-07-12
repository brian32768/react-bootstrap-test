import { useQuery } from '@apollo/client'
import { GET_INSTRUMENTS, PING } from './queries'
//import DropZone from './dropzone'
import Counter from './counter'
import UploadFile from './upload'

const ShowInstruments = ({ querytype, lastname }) => {
    const { loading, error, data } = useQuery(GET_INSTRUMENTS, {
        variables: {querytype,lastname}
    });
    if (error) return <p>Error : {error.message}</p>;
    if (loading) return <p>Loading...</p>;
  
    return data.instruments.map(({objectid, id, firstname, lastname, recording_date }) => (
      <div key={objectid}>
        {objectid} {id} {firstname} {lastname} {recording_date} <br />
      </div>
    ));
}

const Ping = () => {
    const { loading, error, data } = useQuery(PING);
    if (loading) return <>Server starting up...</>;
    if (error) return <>Connect failed: {error.message}</>;
    const d = new Date(data.ping).toLocaleString('en-US',{timezone:'PST'});
    return (
        <font color="lightgrey">{d}</font>
    );
}

const Apollo = () => {
    return (
        <div>
            <h1>Apollo Client</h1>
            
            <Counter /> <br />

            <UploadFile/> <br />

            Ping: <Ping /><br />
        </div>
    )
}
export default Apollo


//             <ShowInstruments querytype="STARTSWITH" lastname="WARRENTON, CITY OF" />
