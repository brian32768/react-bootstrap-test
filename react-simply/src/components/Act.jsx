import { useParams } from 'react-router-dom'
const Act = () => {
    let { act } = useParams();
    console.log("act is", act);
    return (
        <>
            <h1>Act {act}</h1>
            <p>
            </p>    
        </>
    ); 
}
export default Act;