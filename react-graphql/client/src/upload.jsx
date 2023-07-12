import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { INCREMENT_COUNTER, UPLOAD_FILE } from "./queries";

const UploadFile = (props) => {
    const [fileUpload, setFileUpload] = useState("");
    const [uploadFile] = useMutation(UPLOAD_FILE);
    // const [singleUpload] = useMutation(UPLOAD_FILE)
    // function uploadFile(e) {
    //   const Files = e.target.files;
    //   setFileUpload(Files[0]);
    //   const arr = [...fileUpload];

    //   console.log(arr);
    // }


    const exportToDB = () => {
        console.log("Uploading", fileUpload);
        uploadFile({
            variables: {
                file: fileUpload
            }
        });
    }

    const props1 = {
        // name: 'file',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // headers: {
        // 	authorization: 'authorization-text'
        // },
        onChange(info) {
        console.log("aaa", info);
        // if (info.file.status !== 'uploading') {
        // 	console.log(info.file, info.fileList)
        // }
        // if (info.file.status === 'done') {
        // 	message.success(`${info.file.name} file uploaded successfully`)
        // } else if (info.file.status === 'error') {
        // 	message.error(`${info.file.name} file upload failed.`)
        // }
        }
    };

    return (
        <>
        {/* <Upload {...props1}>
            <Button>
            <Icon type="upload" /> Upload
            </Button>
            </Upload> 
        */}
            <input type="file" required onChange={setFileUpload} />
            <Button onClick={exportToDB}>Upload</Button>
        </>
    );
}
export default UploadFile;
