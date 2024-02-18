import React from 'react'

export default function SalesWidget() {
    return (
        <div>
            <div>
                <button className='btn'>New Sale</button>
                <div>
                    <label>Cutomer</label>
                    <input className='form-control' placeholder='Customer' />
                </div>
                <div>
                    <label>Invoice Date</label>
                    <input className='form-control' type='Date' placeholder='Date' />
                </div>
                <div>
                    <label>Due Date</label>
                    <input className='form-control' type='Date' placeholder='Date' />
                </div>
                <div>
                    <label>Amount</label>
                    <input className='form-control' placeholder='Amount' />
                </div>
            </div>
        </div>
    )
}