import React, { useState } from 'react'
import Statements from '../../../libs/api/Statements'

export default function UploadResultLineItem({ results, id }) {
    const [mode, setMode] = useState()
    const [result, setResult] = useState(results)

    const _forceAddTransaction = () => {
        Statements
            .ForceStatementEntries(result)
            .then((r) => {
                console.log(r)
                setResult(r)
            })
        //console.log(result.transaction)
    }

    const _handleAdditionalOptions = () => {
        switch (result.status) {
            case 'Transaction Previously Imported':
                return <td className='text-center' colSpan={3}><button onClick={() => _forceAddTransaction()}>This is not a duplicate</button></td>
            default:
                return <><td className='bg-dark text-light'></td><td className={`${result.isSuccess ? 'bg-success text-light' : 'bg-danger text-light'}`}>{result.status}</td><td>{JSON.stringify(result.transaction)}</td></>
        }
    }

    return (
        <tr
            onMouseEnter={() => setMode('Hover')}
            onMouseLeave={() => setMode()}
            key={`res-${id}`}>
            {
                mode === 'Hover' ?
                    _handleAdditionalOptions()
                    // <td className='text-center' colSpan={3}>123</td>
                    :
                    <><td className='bg-dark text-light'></td><td className={`${result.isSuccess ? 'bg-success text-light' : 'bg-danger text-light'}`}>{result.status}</td><td>{JSON.stringify(result.transaction)}</td></>
            }
        </tr>
    )
}
