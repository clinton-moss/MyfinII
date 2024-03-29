import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Accounts from '../../libs/api/Accounts'
import LedgerDashboard from './Ledger/LedgerDashboard'
import SalesWidget from '../Home/Widgets/Sales/SalesWidget'

export default function AccountDashboard() {
    const { id } = useParams()
    const [account, setAccount] = useState({})
    const [mode, setMode] = useState('')

    useEffect(() => {
        Accounts
            .GetAccount(id)
            .then((r) => {
                setAccount(r)
            })
    }, [])

    const section = () => {
        switch (mode) {
            case 'Sale':
                return <SalesWidget />
            case 'Ledger':
                return <LedgerDashboard />
            default:
                return <div></div>
        }
    }

    return (
        <div>
            <div>
                <div
                ><b>Account:</b> {account.accountName}</div>
            </div>
            <div className='d-flex'>
                <div
                    style={{ cursor: 'pointer' }}
                    className={'p-2 '.concat(mode === 'Sale' ? ' bg-success text-light shadow ' : '')}
                    onClick={() => setMode('Sale')}>Sales</div>
                <div
                    style={{ cursor: 'pointer' }}
                    className={'p-2 '.concat(mode === 'Ledger' ? ' bg-success text-light shadow ' : '')}
                    onClick={() => setMode('Ledger')}>Ledger</div>
                <div
                    style={{ cursor: 'pointer' }}
                    className={'p-2 '.concat(mode === 'Forecast' ? ' bg-success text-light shadow ' : '')}
                    onClick={() => setMode('Forecast')}>Forecast</div>
            </div>
            {section()}
        </div>
    )
}
