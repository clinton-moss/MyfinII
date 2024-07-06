import React from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import Export from '../../libs/api/Export';
export default function ExportOptions() {

    const onGenerateAllLedgers = (e) => {
        Export.AllLedgers()
            .then((res) => {
                var binaryData = atob(res.data);

                const blob = new Blob([new Uint8Array(binaryData.length).map((_, index) => binaryData.charCodeAt(index))], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ExportAllLedgers.xlsx'; // Set the desired file name
                a.click();

                // Revoke the object URL to free up resources
                window.URL.revokeObjectURL(url);
            })
    }
    return (
        <div>
            <h1>Export</h1>
            <div className='row'>
                <div className='col-4'>
                    <div className='card shadow'>
                        <div className='card-body'>
                            <button onClick={onGenerateAllLedgers} className='btn'><SiMicrosoftexcel /> Export All Ledgers</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
