import React, { useEffect, useState } from 'react'
import Accounts from '../../../libs/api/Accounts'

export default function DragAndDropStatement({ droped, onDone }) {
    const [bank, setBank] = useState()
    const [ledger, setLedger] = useState({})
    const [accounts, setAccounts] = useState()
    const [cols, setCols] = useState({})
    const COL_TYPES = ['Date', 'Description', 'Credit', 'Debit', 'Amount', 'Account']
    const _handleChangeColumn = (c, v) => {
        var _cols = { ...cols, [c]: v }
        // var _ledger = ledger
        var _ledger = []
        setCols(_cols)
        _ledger = droped.map((r) => {
            var t = {}
            for (const e of Object.keys(_cols))
                t = { ...t, [_cols[e]]: r[e] }
            if (bank) t = { ...t, Account: bank }
            return t
        })
        // _ledger[COL_TYPES[c]] =
        //     droped.map((r) => r[c])
        setLedger(_ledger)
    }
    const _handleSetDefaultAccount = (c, v) => {
        setBank(v)
        _handleChangeColumn(c, v)
    }
    useEffect(() => {
        const load = async () => setAccounts(await Accounts.ListAccounts())
        load()
    }, [])

    return (
        <div>
            {
                droped && droped.length > 0 &&
                <div className='d-flex flex-column text-dark'>
                    <div className='d-flex'>
                        <b>Default Account: </b>
                        <select
                            onChange={(e) => _handleSetDefaultAccount(COL_TYPES.indexOf('Account'), e.target.value)}
                            className='form-control form-control-sm'>
                            <option></option>
                            {accounts && accounts.map((a, i) => <option key={`Default-Account-${i}`}>{a.accountName}</option>)}</select>
                    </div>
                    <table className='table flex-grow-1'>
                        <thead>
                            <tr>
                                {droped[0].map((x, i) =>
                                    <th key={`Column-Select-${i}`}>
                                        <select
                                            onChange={(e) => _handleChangeColumn(i, e.target.value)}
                                            className='form-control form-control-sm'>
                                            <option></option>
                                            {COL_TYPES.map((m, x) => <option key={`Column-Select-Option-${x}`}>{m}</option>)}
                                        </select>
                                    </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                droped.map((r, i) =>
                                    <tr key={`Data-Row-${i}`}>
                                        {r.map((c, x) => <td key={`Data-Column-${x}`}>{c}</td>)}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='d-shrink-1'>
                        <button onClick={() => onDone(ledger)}>Done</button>
                    </div>
                </div>
            }
        </div>
    )
}
