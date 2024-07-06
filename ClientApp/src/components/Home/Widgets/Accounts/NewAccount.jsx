import React, { useState } from 'react'
import Accounts from '../../../../libs/api/Accounts'

export default function NewAccount({ onCancel, onCreate }) {
    const [account, setAccount] = useState({
        AccountName: '',
        AccountType: ''
    })

    const _handleOnCreate = () => {
        Accounts
            .CreateAccount(account).then(() => onCreate())
    }

    return (
        <div>
            <label>Account Name</label>
            <input
                onChange={(e) => setAccount({ ...account, AccountName: e.target.value })}
                className='form-control' placeholder='Account Name' />
            <div className='row'>
                <div className='col-12 '>
                    <label>Account Type</label>
                    <select
                        onChange={(e) => setAccount({ ...account, AccountType: e.target.value })}
                        className='form-control'>
                        <option></option>
                        <option>Business</option>
                        <option>Personal</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <label>Account Number</label>
                    <input
                        onChange={(e) => setAccount({ ...account, AccountNumber: e.target.value })}
                        className='form-control' placeholder='Account Number' />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 m-2 mt-3'>
                    <button
                        onClick={(e) => onCancel(e)}
                        className='btn bg-secondary'>Cancel</button>
                    <button
                        onClick={(e) => _handleOnCreate()}
                        className='btn bg-success'>Create</button>
                </div>
            </div>
        </div>
    )
}
