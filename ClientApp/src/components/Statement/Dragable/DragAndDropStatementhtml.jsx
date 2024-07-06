import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import Accounts from '../../../libs/api/Accounts';
import DragableCellTR, { TRDragProvider } from './DragableCellTR';
export default function DragAndDropStatementhtml({ droped, onDone }) {
    const [parsed, setParsed] = useState({})
    const [jsonStr, setJsonStr] = useState([])
    const [rendered, setRendered] = useState()
    const [bank, setBank] = useState()
    const [ledger, setLedger] = useState({})
    const [accounts, setAccounts] = useState()
    const [cols, setCols] = useState({})
    const COL_TYPES = ['Date', 'Description', 'Credit', 'Debit', 'Amount', 'Account']

    const _update = (_cols) => {
        var _ledger = []
        console.log(jsonStr)
        _ledger = jsonStr.map((r) => {
            var t = {}
            for (const e of r.columns)
                if (_cols[e.column - 1] !== undefined && e.value)
                    t = { ...t, [_cols[e.column - 1]]: e.value }
            if (bank && Object.keys(t).length > 0) t = { ...t, Account: bank }
            return Object.keys(t).length === 0 ? undefined : t
        })
        setLedger(_ledger)
    }
    useEffect(() => { _update(cols) }, [jsonStr])
    const _handleChangeColumn = (c, v) => {
        var _cols = { ...cols, [c]: v }
        // var _ledger = ledger
        var _ledger = []
        setCols(_cols)
        _update(_cols)
        // console.log(jsonStr, c, v)
        // _ledger = jsonStr.map((r) => {
        //     var t = {}
        //     for (const e of r.columns)
        //         if (_cols[e.column - 1] !== undefined && e.value)
        //             t = { ...t, [_cols[e.column - 1]]: e.value }
        //     if (bank) t = { ...t, Account: bank }
        //     return t
        // })
        // for (const r of jsonStr) {
        //     var t = {}
        //     for (const c of r.columns) {

        //     }
        // }
        // _ledger = droped.map((r) => {
        //     var t = {}
        //     for (const e of Object.keys(_cols))
        //         t = { ...t, [_cols[e]]: r[e] }
        //     if (bank) t = { ...t, Account: bank }
        //     return t
        // })
        // _ledger[COL_TYPES[c]] =
        //     droped.map((r) => r[c])
        // setLedger(_ledger)
    }
    const _handleSetDefaultAccount = (c, v) => {
        setBank(v)
        _handleChangeColumn(c, v)
    }
    useEffect(() => {
        const load = async () => setAccounts(await Accounts.ListAccounts())
        load()
    }, [])

    const _handleLoopJSON = (j, i, path) => {
        console.log('--------' + i, path)
        var _children = []
        console.log('_handleLoopJSON', j.name, j.children, JSON.stringify(j.value))
        if (j.children) {
            if (Array.isArray(j.children)) {
                // console.log('_handleLoopJSON -> child Array')
                for (const c of j.children) {
                    // console.log('--------' + (parseInt(i) + 1)) 
                    _children.push(_handleLoopJSON(c, (parseInt(i) + 1), path + j.name + '/'))
                }
            } else {
                // console.log('_handleLoopJSON -> child Object')
            }
        }
        return <div className={`ps-${i}`}>
            {j.name} - {JSON.stringify(j.value)} {path + j.name}
            <div>{_children}</div>
        </div>
    }
    /*
    {
        "name": "html",
        "attributes": {},
        "children": [
            {
                "name": "body",
                "attributes": {},
                "children": [
                    {
                        "name": "--StartFragment--",
                        "attributes": {},
                        "children": [
                            {
                                "name": "span",
                                "attributes": {
                                    "style": "left: 16.64%; top: 24.2%; font-size: calc(var(--scale-factor)*8.00px); font-family: serif; transform: scaleX(0.873201);",
                                    "role": "presentation",
                                    "dir": "ltr"
                                },
                                "children": [],
                                "value": "01/06/2024"
                            },
                            {
                                "name": "span",
                                "attributes": {
                                    "style": "left: 22.99%; top: 24.2%; font-size: calc(var(--scale-factor)*8.00px); font-family: serif;",
                                    "role": "presentation",
                                    "dir": "ltr"
                                },
                                "children": [],
                                "value": ""
                            },
                            {
                                "name": "span",
                                "attributes": {
                                    "style": "left: 24.83%; top: 24.2%; font-size: calc(var(--scale-factor)*8.00px); font-family: serif; transform: scaleX(0.940861);",
                                    "role": "presentation",
                                    "dir": "ltr"
                                },
                                "children": [],
                                "value": "05412834153920100043998"
                            },*/

    var z = 0
    var _max = 0
    const _handleLoopHtml = (c) => {
        var res = []
        var i = 0
        var r = 1
        // console.log(Array.isArray(c))
        if (Array.isArray(c)) {
            z = 0
            for (const c1 of c) {
                if (Object.keys(c1).includes('props') && Object.keys(c1.props).includes('children')) {
                    if (z++ > _max) _max = z
                    switch (c1.type) {
                        case 'br': r++; i = 0; z = 0; break;
                        case 'div':
                        case 'span': i++; break
                        default: break;
                    }

                    if (i !== 0) {
                        var o = jsonStr.find(x => x.row && parseInt(x.row) === parseInt(r))
                        if (o)
                            o.columns.push({
                                column: i,
                                value: c1.props.children
                            })
                        else
                            jsonStr.push({
                                row: r, columns: [{
                                    column: i,
                                    value: c1.props.children
                                }]
                            })
                    }
                    /*
                [{
                    row: 0
                    cols: [{column:0, value}]
                    }]
                    */

                }
                // if(Object.keys(jsonStr).includes())
                // jsonStr.push({
                //     r: r,
                //     c: i,
                //     val: c1.props.children
                // })
                // res.push(<div>{`${i}-${r}`} {c1.props.children}</div>)
                // }
            }
            //console.log(c1.props.children)
            // console.log(c1.type)
            // console.log('**********', Object.keys(c1).includes('props'))

            //console.log(jsonStr)
            console.log(_max)

            for (var q of jsonStr) {
                if (q.columns.length < _max)
                    for (var a = q.columns.length; a < _max; a++) {
                        q.columns.push({
                            column: a,
                            value: ''
                        })
                    }
            }

            setJsonStr(jsonStr)
            // var table = []
            // if (jsonStr.length > 0) {
            //     var tr = []
            //     for (const r of jsonStr) {
            //         for (const col of r.columns) {
            //             tr.push(<DragableCellTR col={col.column} row={r.row}>{col.value}</DragableCellTR>)
            //         }
            //         table.push(<tr>{tr}</tr>)
            //         tr = []
            //     }
            //     return <TRDragProvider setJsonStr={setJsonStr} jsonStr={jsonStr}><table>{table}</table></TRDragProvider>
            // }
        }
        // 
        // console.log(c1.props)

        // console.log('**********', c1.props)
        // React.Children.forEach((c, (x) =>
        //     console.log(x)
        // ))
        else if (Object.keys(c).includes('props') && Object.keys(c.props).includes('children')) {
            // console.log(c.props.children)
            res.push(_handleLoopHtml(c.props.children))
            // _handleLoopHtml(c.children)
        } else {
            console.log(c)
        }
        return res
    }

    useEffect(() => {

        if (droped) {
            // const _parser = new XMLParser().parseFromString(`<xml>${droped}</xml>`);
            // console.log(_parser, droped)
            // setParsed(_parser);
            // setRendered(_handleLoopJSON(_parser, 0, '/'))
            setRendered(_handleLoopHtml(parse(droped)))
        }
    }, [droped])

    const _handleDone = () => {
        //setLedger
        // var result = []
        // for (const r of jsonStr) {
        //     var cols = {}
        //     for (const c of r.columns) {
        //         cols[COL_TYPES[]]
        //     }
        //     result.push(cols)
        //     // result.push({

        //     // })
        // }
        onDone(ledger)
        // console.log(ledger)
    }

    return (
        <div className='text-dark'>
            {rendered && rendered}
            <div className='d-flex'>
                <b>Default Account: </b>
                <select
                    onChange={(e) => _handleSetDefaultAccount(COL_TYPES.indexOf('Account'), e.target.value)}
                    className='form-control form-control-sm'>
                    <option></option>
                    {accounts && accounts.map((a, i) => <option key={`Default-Account-${i}`}>{a.accountName}</option>)}</select>
            </div>
            {
                jsonStr && <TRDragProvider setJsonStr={setJsonStr} jsonStr={jsonStr}>
                    <table>
                        <thead>
                            <tr>
                                {jsonStr && jsonStr.length > 0 && jsonStr[0].columns.map((r, i) => <td><select
                                    onChange={(e) => _handleChangeColumn(i, e.target.value)}
                                    className='form-control form-control-sm'>
                                    <option></option>
                                    {COL_TYPES.map((m, x) => <option key={`Column-Select-Option-${x}`}>{m}</option>)}
                                </select></td>)}
                            </tr>
                        </thead>

                        {jsonStr.map((r) =>
                            <tr>
                                {r.columns.map((col) => <DragableCellTR col={col.column} row={r.row}>{col.value}</DragableCellTR>)}
                            </tr>
                        )}
                    </table>
                </TRDragProvider>
            }
            <pre>
                {/* {
                    parsed &&
                    JSON.stringify(parsed, 1, '\t',)
                } */}

            </pre>
            {
                // droped && <div dangerouslySetInnerHTML={{ __html: droped }} />
            }
            <div className='d-shrink-1'>
                <button onClick={_handleDone}>Done</button>
            </div>
        </div>
    )
}
