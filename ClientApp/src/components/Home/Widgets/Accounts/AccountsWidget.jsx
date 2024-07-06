import React, { useEffect, useState } from 'react'
import Accounts from '../../../../libs/api/Accounts'
import NewAccount from './NewAccount'
import SelectAccount from './SelectAccount'

export default function AccountsWidget() {
    const [mode, setMode] = useState('')
    const [accounts, setAccounts] = useState([])
    const [account, setAccount] = useState(localStorage.getItem('Account') ? localStorage.getItem('Account') : '')

    const _handleAccountSelect = (d) => {
        if (d.mode === 'Select') {
            localStorage.setItem('Account', d.Account.id)
            setAccount(d.Account.id)
            window.location = 'Accounts/' + d.Account.id
        }
        setMode(d.mode)
    }

    useEffect(() => {
        _loadAccounts()
    }, [])

    const _loadAccounts = () => {
        Accounts
            .ListAccounts()
            .then((r) => {
                setAccounts(r)
            })
    }

    const Section = () => {
        switch (mode) {
            case 'Create':
                return <NewAccount
                    onCancel={() => { setMode('') }}
                    onCreate={() => { _loadAccounts(); setMode('') }}
                />
            default:
                return <SelectAccount
                    accounts={accounts}
                    account={account}
                    onRemoved={() => _loadAccounts()}
                    onSelect={(d) => _handleAccountSelect(d)}
                />
        }
    }

    return (
        <div className='bg-dark col-4 text-light text-center p-2 rounded'>
            <h2>Accounts</h2>
            {Section()}
        </div>
    )
}
