import { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { readFile } from 'xlsx'

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#0f0f0f',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744',
  backgroundColor: '#ffd0d0'
};

const uploadFile = (filename) => {
    console.log(filename)
    readFile(filename)
//    fetch('https://path/to/api', { // finish this yourself or refer to react-graphql
        // content-type header should not be specified!
  //      method: 'POST',
    //    body: file,
      /*()})
        .then(response => response.json())
        .then(success => {
          // Do something with the successful response
        })
        .catch(error => console.log(error)
      );
      */
}

const DropZone = () => {

    const onDrop = useCallback(acceptedFiles => {
        const fname = acceptedFiles[0].name;
        console.log(fname);
        uploadFile(fname);
    }, []);

    const { 
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        // acceptable mime types https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ['.xlsx'],
        },
        multiple: false
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    
    return (
        <>
            <h1>Drop Zone</h1>

            <p>Testing drag and drop of a file here.</p>

            <p>
            <a href="https://react-dropzone.js.org">react-dropzone</a> currently version 14 <br />
            <a href="https://github.com/react-dropzone/react-dropzone">source code at github</a> <br />
                <a href="https://www.digitalocean.com/community/tutorials/react-react-dropzone">Digital Ocean tutorial</a> for version 11<br />
            </p>

            <div {...getRootProps({style})}>
            <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a spreadsheet to upload!'}
              {isDragActive && !isDragReject && "Drop it!"}
              {isDragReject && "File type not accepted, sorry!"}            
            </div>
        </>
    ); 
}
export default DropZone;