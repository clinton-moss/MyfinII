import React, { useState } from 'react';
import { Key } from 'react-bootstrap-icons';
import DateTimeFancy from './DateTimeFancy';
import DateTimeFilter from './DateTimeFilter';
import GUIDToggle from './GUIDToggle';
import GuidFilter from './GuidFilter';
import StatusFancy from './StatusFancy';
import StatusFilter from './StatusFilter';

import './LogsTableComponent.css';

export default function LogsTableComponent({ logs, options, className }) {
    const [filters, setFilters] = useState([])
    const [filtered, setFiltered] = useState(logs)
    const _handleFancyGuid = (GUID) => {
        if (GUID)
            return <GUIDToggle GUID={GUID} />
        return <Key />
    }

    const _handleFilter = (c, v) => {
        var _fil = [...filters]
        _fil[c] = v
        // setFilters[c] = v
        var res = []
        for (const _l of logs)
            if (Object.keys(_l).includes(c))
                if (v === "")
                    res.push(_l)
                else if (_l[c] === v)
                    res.push(_l)

        //filtered
        setFiltered(res)
        setFilters(_fil)
    }

    const _findStatuses = (n) => {
        const _statuses = []
        if (logs && logs.length > 0)
            for (const _log of logs)
                if (Object.keys(_log).includes(n))
                    if (!_statuses.includes(_log[n]))
                        _statuses.push(_log[n])
        return _statuses
    }
    const _filters = () => {
        var filters = []
        if (options.columns)
            for (const heading of options.columns)
                switch (heading.type) {
                    case 'STATUS': filters[heading.name] = <StatusFilter statuses={_findStatuses(heading.name)} onFilter={(f) => _handleFilter(heading.name, f)} />; break;
                    case 'DATETIME': filters[heading.name] = <DateTimeFilter onFilter={(f) => _handleFilter(heading.name, f)} />; break;
                    case 'GUID': filters[heading.name] = <GuidFilter onFilter={(f) => _handleFilter(heading.name, f)} />; break;
                    default: filters[heading.name] = <input className='form-control form-control-sm d-none' />
                }

        //return filters
        return []
    }
    const _fancyData = (data, type) => {
        switch (type) {
            case 'STATUS': return <StatusFancy status={data} />;
            case 'DATETIME': return <DateTimeFancy dt={data} />
            case 'GUID': return _handleFancyGuid(data);
            default: return data
        }
    }

    const _generateTableHeadings = () => {
        var _headings = []
        var filters = _filters()
        if (options.columns)
            for (const heading of options.columns)
                _headings.push(<th>{heading.human ? heading.human : heading.name}<div>{filters[heading.name]}</div></th>)
        else _headings.push(<th>No heading information available</th>)
        return <thead className='bg-primary-container'><tr>{_headings}</tr></thead>
    }

    const _generateTableBody = () => {
        var _body = []
        var _row = []
        if (filtered && logs.length > 0) {
            for (const _log of filtered) {
                _row = []
                //    _body
                for (const heading of options.columns) {
                    try { _row.push(<td>{_fancyData(_log[heading.name], heading.type)}</td>) }
                    catch (e) { _row.push(<td></td>) }
                }
                _body.push(<tr>{_row}</tr>)
            }
        }
        else _body.push(<td>No data available</td>)
        return <tbody>{_body}</tbody>
    }

    const _generateTable = () => {
        return (
            <table className={'w-100 text-center '.concat(className)}>
                {_generateTableHeadings()}
                {_generateTableBody()}
            </table>
        )
    }
    return (
        <div>
            {_generateTable()}
        </div>
    )
}
