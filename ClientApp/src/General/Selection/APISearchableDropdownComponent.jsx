import React, { useEffect, useState } from 'react'
import { XCircle } from 'react-bootstrap-icons'
import './APISearchableDropdown.css'
export default function APISearchableDropdownComponent({ dataset, options, className, placeholder, onCreate,onSelect, multi }) {
    const [createResult, setCreateResult] = useState({})
    const [results, setResults] = useState([])
    const [mode, setMode] = useState()
    const [datasets, setDatasets] = useState(dataset)

    useEffect(() => { setDatasets(dataset) }, [dataset])

    const _handleSearch = (s) => {

    }

    const _handleSelectResult = (s) => {
        var _results = results
        var _exists = _results.find(r => r[options.dataset.primaryKey] === s[options.dataset.primaryKey])
        if (_exists)
            _results.splice(_exists, 1)
        else
            if (multi) _results.push(s); else _results[0] = s;
        setResults([..._results])
        if(onSelect) onSelect(_results)
    }

    const _handleShowCreate = (e) => {
        setMode('Add')
    }

    const _handleSetCreateValues = (k, v) => {
        var _values = createResult
        _values[k] = v
        setCreateResult(_values)
    }

    const _handlecreate = (e) => {
        onCreate(createResult)
            .then((r) => { setDatasets([...datasets, r]); _handleSelectResult(r); setMode('Search') })
    }
    return (
        <div className={'api-searchable-drop-down position-relative w-100 '.concat(className)}>
            <div onClick={() => setMode('Search')} className='results'>{results.length === 0 ? placeholder : results.map((r) => options.dataset.viewFields.map((f) => <span key={'result-field-' + r[options.dataset.primaryKey] + '-' + f.field} className='result-field'> {r[f.field]} </span>))}</div>
            {
                mode === 'Add'
                    ?
                    <div className='create-container position-absolute'>
                        <div className='text-end'><XCircle onClick={() => setMode()} /></div>
                        {options.dataset.create.createFields.map((f) => <div key={'create-fields-' + f.field}><label>{f.hr}</label><input onChange={(e) => _handleSetCreateValues(f.field, e.target.value)} className='form-control' /></div>)}
                        <button onClick={_handlecreate} className='btn'>Create</button>
                    </div>
                    :
                    mode === 'Search'
                        ?
                        <>
                            <div className='search-container position-absolute'>
                                <div className='text-end'><XCircle onClick={() => setMode()} /></div>
                                <input onChange={(e) => _handleSearch(e.target.value)} className='form-control search-bar' placeholder='Search' />
                                <ul className='search-results'>
                                    {options.dataset.create ? <li key={'search-create'} onClick={_handleShowCreate}>{options.dataset.create.description}</li> : <></>}
                                    {datasets.map((r) => <li key={'search-' + r[options.dataset.primaryKey]} onClick={() => _handleSelectResult(r)} className='search-result'>{options.dataset.viewFields.map((f) => <span key={'search-' + r[options.dataset.primaryKey] + '-' + f.field} className='search-result-field'> {r[f.field]} </span>)}</li>)}</ul>
                            </div>
                        </>
                        : <></>
            }
        </div>
    )
}
