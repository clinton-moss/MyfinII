import React, { useContext, useState } from 'react';
import { Robot } from 'react-bootstrap-icons';
import ErrorContext from '../../General/Errors/ErrorProvider';
import FileUpload from '../../General/FileUpload/FileUpload';
import GeneralModal from '../../General/Modal/GeneralModal';
import Statements from '../../libs/api/Statements';
import UploadFile from '../../libs/api/Types/UploadFile';
import CommonContext from '../Common/CommonProvider';
import DragAndDropStatementModal from './Dragable/DragAndDropStatementModal';


export default function UploadStatement({ className }) {
    const { setProcessing } = useContext(CommonContext)
    const [droped, setDroped] = useState([])
    const [dropedHTML, setDropedHTML] = useState([])
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

        setProcessing({ text: 'Processing... Please wait', icon: <Robot size={50} /> })
        Statements
            .ProcessStatementEntries({
                Ledger: ledger
            }).then((r) => {
                setResult({ details: r })

                setProcessing()
            });
        setDroped([])
    }

    const _handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const _handleDrop = (event) => {
        event.preventDefault()

        // console.log(event.dataTransfer.types)
        // console.log(event.dataTransfer.getData('text/plain'))
        // console.log(new XMLParser().parseFromString(event.dataTransfer.getData('text/html')))
        // console.log(e.dataTransfer.getData('text'))
        // console.log(event.dataTransfer.getData('text/plain'))
        // console.log(event.dataTransfer.getData('text/html'))
        var _dropped = []

        const text = event.dataTransfer.getData('text/plain')
        for (const row of text.split('\n'))
            if (row.trim().length > 0) {
                _dropped.push(row.split('\t'))
            }
        setDroped(_dropped)
        setDropedHTML(event.dataTransfer.getData('text/html'))
    }

    return (
        <div>
            <FileUpload PostURL={'api/Statement/Upload'} onComplete={(r) => setResult(r)} onError={(e) => setError({ show: true, description: e, title: 'Failed To Upload Statement', yesAction: undefined, noAction: undefined })} />
            <table className={'table table-bordered '.concat(className)}>
                {
                    result.data && result.data.map((r, i) =>
                        <tr key={r.id}><td>{r.status}</td><td>{r.transaction.description}</td><td>{r.transaction.amount}</td></tr>
                    )
                }
                {
                    result.details && result.details.map((r, i) =>
                        <tr key={`res-${i}`}><td className='bg-dark text-light'></td><td className={`${r.isSuccess ? 'bg-success text-light' : 'bg-danger text-light'}`}>{r.status}</td><td>{JSON.stringify(r.transaction)}</td></tr>
                    )
                }
            </table>
            <GeneralModal show={droped.length > 0} onClose={() => setDroped([])}>
                <DragAndDropStatementModal _handleDropComplete={_handleDropComplete} droped={droped} dropedHTML={dropedHTML} />
                {/* <DragAndDropStatement droped={droped} onDone={_handleDropComplete} />
                <DragAndDropStatementhtml droped={dropedHTML} onDone={_handleDropComplete} /> */}
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
