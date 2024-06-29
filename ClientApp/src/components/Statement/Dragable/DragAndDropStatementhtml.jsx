import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import DragableCellTR, { TRDragProvider } from './DragableCellTR';
export default function DragAndDropStatementhtml({ droped, onDone }) {
    const [parsed, setParsed] = useState({})
    const [jsonStr, setJsonStr] = useState([])
    const [rendered, setRendered] = useState()
    const [bank, setBank] = useState()
    const [ledger, setLedger] = useState({})
    const [accounts, setAccounts] = useState()
    const [cols, setCols] = useState({})
    const COL_TYPES = ['Date', 'Description', 'Credit', 'Debit', 'Account']
    // const _handleChangeColumn = (c, v) => {
    //     var _cols = { ...cols, [c]: v }
    //     // var _ledger = ledger
    //     var _ledger = []
    //     setCols(_cols)
    //     _ledger = droped.map((r) => {
    //         var t = {}
    //         for (const e of Object.keys(_cols))
    //             t = { ...t, [_cols[e]]: r[e] }
    //         if (bank) t = { ...t, Account: bank }
    //         return t
    //     })
    //     // _ledger[COL_TYPES[c]] =
    //     //     droped.map((r) => r[c])
    //     setLedger(_ledger)
    // }
    // const _handleSetDefaultAccount = (c, v) => {
    //     setBank(v)
    //     _handleChangeColumn(c, v)
    // }
    // useEffect(() => {
    //     const load = async () => setAccounts(await Accounts.ListAccounts())
    //     load()
    // }, [])

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

    const _handleLoopHtml = (c) => {
        var res = []
        var i = 1
        var r = 1
        // console.log(Array.isArray(c))
        if (Array.isArray(c)) {

            for (const c1 of c) {
                if (Object.keys(c1).includes('props') && Object.keys(c1.props).includes('children')) {
                    switch (c1.type) {
                        case 'br': r++; i = 0; break;
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

    return (
        <div className='text-dark'>
            {rendered && rendered}
            {
                jsonStr && <TRDragProvider setJsonStr={setJsonStr} jsonStr={jsonStr}>
                    <table>
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
        </div>
    )
}
