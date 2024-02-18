import React, { useEffect, useState } from 'react'
import LogsTableComponent from '../../../../General/Tables/LogsTableComponent'
import Accounts from '../../../../libs/api/Accounts'

export default function TransactionLedgerWidget({ accountId }) {
    const [ledger, setLedger] = useState()
    useEffect(() => { _loadLedger() }, [])

    const _loadLedger = () => {
        Accounts
            .ListRunningLedger(accountId)
            .then((r) => setLedger(r))
    }

    return (
        <div style={{overflow:'auto'}} className='p-3'>
            {
                ledger ? <LogsTableComponent className={'tbl-xs'} logs={ledger} options={{
                    columns: [
                        {
                            name: 'id',
                            type: 'GUID',
                            human: '#'
                        }, {
                            name: 'dateTime',
                            type: 'DATETIME',
                            human: 'Transaction Date'
                        }, {
                            name: 'description',
                            type: 'STRING',
                            human: 'Transaction Description'
                        }, {
                            name: 'amount',
                            type: 'CURRENCY',
                            human: 'Amount'
                        }
                    ]
                }} /> : <></>
                /*ledger.map((r) =>
                    <div key={r.id}>{JSON.stringify(r, null, '\t')}</div>
                )*/
            }
        </div>
    )
}
