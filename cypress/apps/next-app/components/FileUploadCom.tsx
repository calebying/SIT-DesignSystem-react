'use client'
import { FileUpload } from "@sit-canvas/canvas-react"
import { useState } from "react";

const FileUploadCom = () => {
    const [selectedFile, setSelectedFile] = useState({});
    const onChangeFile = (data: FileList) => {
        setSelectedFile(data);
    };
    return (
        <FileUpload
            controlId="fileupload1"
            onChangeFile={onChangeFile}
            selectedFile={selectedFile}
        >
            <i className="bi bi-upload me-2"></i>Choose a file
        </FileUpload>
    );
};

export default FileUploadCom;