import React from 'react';
import FileUpload from '../../General/FileUpload/FileUpload';
import Statements from '../../libs/api/Statements';
import UploadFile from '../../libs/api/Types/UploadFile';

export default function UploadStatement() {

    const _handleUploadFile = (file) => {
        console.log(file)
        const _uploadFile = UploadFile;
        _uploadFile.content = '';
        _uploadFile.contentType = '';
        _uploadFile.fileName = '';
        Statements
            .ProcessStatementFile(_uploadFile);
    }

    return (
        <div>
            <FileUpload PostURL={'api/Statement/Upload'} />
            <input type='file' onChange={(e) => _handleUploadFile(e)} />
        </div>
    )
}
