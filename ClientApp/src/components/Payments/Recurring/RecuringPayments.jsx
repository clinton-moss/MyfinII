import React from 'react'
import { useParams } from 'react-router-dom'

export default function RecuringPayments() {
    const id = useParams()
    return (
        <div>
            <h1>Recurring Payments</h1>
            <div>
                <input className='form-control' placeholder='Name of payment' />
                <input className='form-control' placeholder='Amount' />
                <input className='form-control' placeholder='Occours in the X day of the month' />
                <button className='btn'>Create</button>
            </div>
        </div>
    )
}
