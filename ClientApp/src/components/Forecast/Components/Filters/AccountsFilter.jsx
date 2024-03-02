import React, { useEffect, useState } from 'react'
import APIMultiSelection from '../../../../General/Selection/APIMultiSelection'
import Accounts from '../../../../libs/api/Accounts'

export default function AccountsFilter() {
    
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        Accounts
            .ListAccounts()
            .then((r) => setAccounts(r))
    }, [])



    return (
        <div>
            <APIMultiSelection options={{
                primaryField: 'accountName',
                idField: 'id'
            }} data={accounts} />
            <div></div>
        </div>
    )
}
