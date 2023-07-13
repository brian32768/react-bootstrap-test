import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { UPLOAD_FILE } from "./queries";

const UploadFile = (props) => {
    const [ fileUpload, setFileUpload] = useState("");
    const [ uploadFile, {data,loading,error}] = useMutation(UPLOAD_FILE);
    const exportToDB = () => {
        console.log("exportToDB");
        uploadFile({
            variables: {
                file: fileUpload
            }
        });
    }
    return (
        <>
            <input type="file" required onChange={setFileUpload} />
            <Button onClick={exportToDB}>Upload</Button>
        </>
    );
}
export default UploadFile;
