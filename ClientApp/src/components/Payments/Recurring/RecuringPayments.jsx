import React from 'react'
import { useParams } from 'react-router-dom'

export default function RecuringPayments() {
    const id = useParams()
    return (
        <div>
            <h1>Recurring Payments</h1>
            <div className='d-flex'>
                <div className=' w-50'>
                    <table className='table'>
                        <thead>
                            <td>Name</td>
                            <td>Amount</td>
                            <td>Occours on</td>
                        </thead>
                    </table>
                </div>
                <div className='rounded shadow p-2 w-50 text-center'>
                    <h2>Create New Payment</h2>
                    <input className='form-control' placeholder='Name of payment' />
                    <input className='form-control' placeholder='Amount' />
                    <input className='form-control' placeholder='Occours on the X day of the month' />
                    <button className='btn'>Create</button>
                </div>
            </div>
        </div>
    )
}
