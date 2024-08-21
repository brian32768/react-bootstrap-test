import { Fragment } from 'react';
import { useParams } from 'react-router-dom'
const Act = () => {
    let { act } = useParams();
    console.log("act is", act);
    return (
        <Fragment>
            <h1>Act {act}</h1>
            <p>
            </p>    
        </Fragment>
    ); 
}
export default Act;