import React, { useState } from 'react';
import FileUpload from '../../General/FileUpload/FileUpload';
import Statements from '../../libs/api/Statements';
import UploadFile from '../../libs/api/Types/UploadFile';

export default function UploadStatement() {
    const [result, setResult] = useState([])
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
            <FileUpload PostURL={'api/Statement/Upload'} onComplete={(r) => setResult(r)} />
            {
                result.data && result.data.map((r) =>
                    <div key={r.id}>{r.status} - {r.transaction.description} - {r.transaction.amount}</div>
                )
            }
        </div>
    )
}
