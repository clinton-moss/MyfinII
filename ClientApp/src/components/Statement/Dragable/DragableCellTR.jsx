import React, { useContext, useState } from 'react'

const TRDragContext = React.createContext()

export const TRDragProvider = ({ setJsonStr, jsonStr, children }) => {
    const [active, setActive] = useState({})
    const [over, setOver] = useState({})
    const handleStartDrag = (c, r) => {
        // console.log('Start Move : ', c, r)
        setActive({ row: r, col: c })
    }
    const handleOverDrag = (c, r) => {
        // console.log('Over Move : ', active.col, active.row, c, r)
        setOver({ row: r, col: c })
    }
    const handleEndDrag = (c, r) => {
        // setJsonStr([])
        // console.log('End Move : ', active.col, active.row, over.col, over.row)
    }

    const _handleMove = () => {
        var _jstr = jsonStr
        var jsonStrStart = _jstr.find(x => x.row === active.row).columns.find(x => x.column === active.col)
        var jsonStrEnd = _jstr.find(x => x.row === over.row).columns.find(x => x.column === over.col)
        jsonStrEnd.value = jsonStrStart.value
        jsonStrStart.value = ''
        setJsonStr([..._jstr])
        _handleCancel()
    }
    const _handleAppend = () => {
        var _jstr = jsonStr
        var jsonStrStart = _jstr.find(x => x.row === active.row).columns.find(x => x.column === active.col)
        var jsonStrEnd = _jstr.find(x => x.row === over.row).columns.find(x => x.column === over.col)
        jsonStrEnd.value = jsonStrEnd.value + ' ' + jsonStrStart.value
        jsonStrStart.value = ''
        setJsonStr([..._jstr])
        _handleCancel()
    }
    const _handleCancel = () => {
        setActive({})
        setOver({})
    }


    return <TRDragContext.Provider value={{
        handleStartDrag,
        handleOverDrag,
        handleEndDrag,
        over
    }}>
        {active && Object.keys(active).length > 0 && over && Object.keys(over).length > 0 &&
            <div style={{ position: 'absolute' }}>
                <button onClick={_handleMove}>Move</button>
                <button onClick={_handleAppend}>Append</button>
                <button onClick={_handleCancel}>Cancel</button>
            </div>
        }
        {children}</TRDragContext.Provider>
}

export default function DragableCellTR({ children, col, row }) {
    const { handleStartDrag, handleOverDrag, handleEndDrag, over } = useContext(TRDragContext)

    return (
        <td
            className={`${over && over.row === row && over.col === col ? 'bg-primary' : ''}`}
            draggable
            onDragStart={() => handleStartDrag(col, row)}
            onDragOver={() => handleOverDrag(col, row)}
            onDragEnd={() => handleEndDrag(col, row)}
        >
            {children}
        </td>
    )
}
