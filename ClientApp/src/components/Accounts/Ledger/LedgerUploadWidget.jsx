import React from 'react'
import UploadStatement from '../../Statement/UploadStatement'

export default function LedgerUploadWidget() {

    return (
        <div className='col-4 bg-dark text-light p-3 m-2 rounded text-center'>
            <b>
                <i className="bi bi-upload me-2" ></i>Upload</b>
            <p>Select a statement file to upload</p>
                <UploadStatement className='text-light small' />
        </div>
    )
}
