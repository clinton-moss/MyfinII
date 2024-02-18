import React, { useContext, useState } from 'react';
import ErrorContext from '../../General/Errors/ErrorProvider';
import FileUpload from '../../General/FileUpload/FileUpload';
import Statements from '../../libs/api/Statements';
import UploadFile from '../../libs/api/Types/UploadFile';

export default function UploadStatement({ className }) {
    const [result, setResult] = useState([])
    const { setError } = useContext(ErrorContext)
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
            <FileUpload PostURL={'api/Statement/Upload'} onComplete={(r) => setResult(r)} onError={(e) => setError({show: true, description: e, title: 'Failed To Upload Statement', yesAction: undefined, noAction: undefined})} />
            <table className={'table '.concat(className)}>
                {
                    result.data && result.data.map((r) =>
                        <tr key={r.id}><td>{r.status}</td><td>{r.transaction.description}</td><td>{r.transaction.amount}</td></tr>
                    )
                }
            </table>
        </div>
    )
}
