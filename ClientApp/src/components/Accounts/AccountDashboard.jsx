import React, { useEffect, useState } from 'react'
import { Link } from 'react-bootstrap-icons'
import { NavLink, useParams } from 'react-router-dom'
import { NavItem, Navbar } from 'reactstrap'
import Accounts from '../../libs/api/Accounts'
import SalesWidget from '../Home/Widgets/Sales/SalesWidget'
import TransactionLedgerWidget from '../Home/Widgets/Transactions/TransactionLedgerWidget'
import LedgerDashboard from './Ledger/LedgerDashboard'

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
            <div className='d-flex'>
                {
                    mode === 'Forecast'
                        ?
                        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark p-1"
                                        to={"/Accounts/" + id + "/Payments/Recurring"}>Recuring Payments</NavLink>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark p-1"
                                        to={"/Accounts/" + id + "/Lifestyle/Inventory"}>Planned Spending</NavLink>
                                </NavItem>
                            </ul>
                        </Navbar>
                        :
                        <></>
                }
            </div>
            {section()}
            <div className='row'>
                <div className='col-lg-3'><div className='shadow' style={{ maxHeight: '50vh', overflow: 'auto' }}>
                    <h3 className='text-center'>Ledger</h3>
                    <TransactionLedgerWidget accountId={id} />
                </div></div>
            </div>

        </div>
    )
}
