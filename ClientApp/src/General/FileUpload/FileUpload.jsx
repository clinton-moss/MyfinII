import axios from 'axios';
import React, { useRef, useState } from 'react';
import UploadFile from '../../libs/api/Types/UploadFile';
import './FileUpload.css';
function FileUpload({ PostURL, onComplete, onError }) {
    const [processing, setProcessing] = useState(false); // storing the uploaded file    
    const [file, setFile] = useState(''); // storing the uploaded file    
    // storing the recived file from backend
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    async function getBase64(_file) {
        return new Promise((resolve) => {
            //   let baseURL = ''
            // Make new FileReader
            const reader = new FileReader()

            // Convert the file to base64 text
            reader.readAsDataURL(_file)
            // on reader load somthing...
            reader.onload = async () => {
                // Make a fileInfo Object
                // baseURL = reader.result
                resolve(reader.result)
            }
        })
    }
    const StripMime = (fileData) => {
        var type = undefined
        var format = undefined
        var base64 = false
        var content = undefined

        type = fileData.substr(0, fileData.indexOf(':'))
        format = fileData.substr(fileData.indexOf(':') + 1, fileData.indexOf(';') - (type.length + 1))
        base64 = fileData.substr(type.length + format.length + 2, 7)
        base64 = base64 === 'base64,'
        if (base64)
            content = fileData.substr(type.length + format.length + 2 + 7)
        else
            content = fileData.substr(type.length + format.length + 2 + 1)

        return {
            type: type,
            format: format,
            base64: base64,
            content: content
        }
    }
    const uploadFile = async () => {
        setProcessing(true)
        // const formData = new FormData();
        const _uploadFile = UploadFile;
        _uploadFile.contentType = file.type
        _uploadFile.fileName = file.name
        _uploadFile.content = StripMime(await getBase64(file)).content

        // formData.append('file', file); // appending file
        // axios.post(PostURL, formData, {
        axios.post(PostURL, _uploadFile, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            if (onComplete) onComplete(res)
            setProcessing(false)
        }).catch(err => {

            if (onError) onError(err)
            setProcessing(false)
        })
    }
    return (
        <div>
            <div className="file-upload">
                <input className={'fileName '.concat(processing ? 'd-none' : '')} type="file" ref={el} onChange={handleChange} />
                <div className="progessBar">

                    <div className='progress position-relative' style={{ width: progress }}>
                        <div className='position-absolute' style={{ left: '45%' }}>{progress}</div>
                    </div>
                </div>

                <button onClick={uploadFile} className="upbutton btn btn-sm btn-success">
                    Upload
                </button>
                <hr />
            </div>
        </div>
    );
}
export default FileUpload;