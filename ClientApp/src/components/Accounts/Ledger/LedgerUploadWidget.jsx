import React, { useState } from 'react'

export default function LedgerUploadWidget() {

    const [selectedFile, setSelectedFile] = useState()

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );
        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // // Request made to the backend api
        // // Send formData object
        // axios.post("api/uploadfile", formData);
    }

    const onFileChange = event => {

        console.log(event.target.files[0])
        // Update the state
        setSelectedFile(event.target.files[0]);

    };

    return (
        <div className='col-4 bg-dark text-light p-3 m-2 rounded text-center'>
            <b>
                <i className="bi bi-upload me-2" ></i>Upload</b>
            <p>Select a statement file to upload</p>
            <input
                onChange={(e) => onFileChange(e)}
                className='form-control form-control-sm' type='file' />
            {
                selectedFile
                    ?
                    <button
                        onClick={() => onFileUpload()}
                        className='btn bg-warning mt-3'>Upload</button>
                    :
                    <></>
            }
        </div>
    )
}
