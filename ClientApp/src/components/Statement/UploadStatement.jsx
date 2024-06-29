import React, { useContext, useState } from 'react';
import ErrorContext from '../../General/Errors/ErrorProvider';
import FileUpload from '../../General/FileUpload/FileUpload';
import GeneralModal from '../../General/Modal/GeneralModal';
import Statements from '../../libs/api/Statements';
import UploadFile from '../../libs/api/Types/UploadFile';
import DragAndDropStatement from './Dragable/DragAndDropStatement';

export default function UploadStatement({ className }) {
    const [droped, setDroped] = useState([])
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

    const _handleDropComplete = (ledger) => {
        Statements
            .ProcessStatementEntries({
                Ledger: ledger
            });
        setDroped([])
    }

    const _handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const _handleDrop = (event) => {
        event.preventDefault()
        // console.log(e.dataTransfer.getData('text'))
        // console.log(event.dataTransfer.getData('text/plain'))
        var _dropped = []
        const text = event.dataTransfer.getData('text/plain')
        for (const row of text.split('\n'))
            if (row.trim().length > 0) {
                _dropped.push(row.split('\t'))
            }
        setDroped(_dropped)
    }

    return (
        <div>
            <FileUpload PostURL={'api/Statement/Upload'} onComplete={(r) => setResult(r)} onError={(e) => setError({ show: true, description: e, title: 'Failed To Upload Statement', yesAction: undefined, noAction: undefined })} />
            <table className={'table '.concat(className)}>
                {
                    result.data && result.data.map((r, i) =>
                        <tr key={r.id}><td>{r.status}</td><td>{r.transaction.description}</td><td>{r.transaction.amount}</td></tr>
                    )
                }
            </table>
            <GeneralModal show={droped.length > 0} onClose={() => setDroped([])}>
                <DragAndDropStatement droped={droped} onDone={_handleDropComplete} />
            </GeneralModal>
            <table
                draggable
                onDragOver={_handleDragOver}
                onDrop={_handleDrop}
                className='table'
            >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Desccription</th>
                        <th>Credit</th>
                        <th>Debit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input className='form-control' placeholder='Date' /></td>
                        <td><input className='form-control' placeholder='Desccription' /></td>
                        <td><input className='form-control' placeholder='Credit' /></td>
                        <td><input className='form-control' placeholder='Debit' /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
