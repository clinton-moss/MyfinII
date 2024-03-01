import React, { useEffect, useState } from 'react';
import { Check2Square, Square } from 'react-bootstrap-icons';

export default function APIMultiSelection(
    {
        options,
        data,
        onSelected
    }) {
    const [selected, setSelected] = useState([])
    const [selectedDescr, setSelectedDescr] = useState([])
    useEffect(() => { if (onSelected) onSelected(selected) }, [selected])

    const _handleSelected = (d) => {
        var _selected = selected
        if (selected.includes(d[options.idField]))
            _selected.splice(_selected.indexOf(d[options.idField]), 1)
        else
            _selected.push(d[options.idField])

        setSelected([..._selected])
    }
    return (
        <div style={{ cursor: 'pointer' }}>
            <div>{selectedDescr}</div>
            <ul className='list-unstyled'>
                {
                    data.map((d) =>
                        <li onClick={() => _handleSelected(d)} key={d[options.idField]}>
                            {selected.includes(d[options.idField]) ? <Check2Square /> : <Square />}
                            {d[options.primaryField]}</li>
                    )
                }
            </ul>
        </div>
    )
}
