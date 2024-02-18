import React, { useEffect, useState } from 'react'
import Accounts from '../../../../libs/api/Accounts'

export default function SelectAccount({ onSelect, accounts, onRemoved }) {

    const _handleRemoveAccount = (acc) => {
        Accounts
            .RemoveAccount(acc.id)
            .then((r) => {
                onRemoved()
            })
    }

    return (
        <>
            <div
                onClick={(e) => onSelect({ mode: 'Create' })}
                style={{ cursor: 'pointer' }}>
                <i className="bi bi-plus-circle me-2" ></i>
                Create Account
            </div>
            <div className='p-2 bg-light text-dark m-2'>
                {
                    accounts.map((acc) =>
                        <div
                            onClick={(e) => onSelect({ mode: 'Select', Account: acc })}
                            key={acc.id}
                            style={{ cursor: 'pointer' }}
                            className={'d-flex justify-content-between p-2 ' .concat(localStorage.getItem('Account') === acc.id ? ' bg-success text-white ' : '') }>
                            {acc.accountName}
                            <i
                                onClick={(e) => _handleRemoveAccount(acc)}
                                className="bi bi-trash me-2" ></i>
                        </div>
                    )
                }
            </div>
        </>
    )
}
