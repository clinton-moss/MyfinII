import React, { useState } from 'react'
import { Key } from 'react-bootstrap-icons'

export default function GUIDToggle({ GUID }) {
    const [show, setShow] = useState(false)
    return (
        <div>
            <Key  onClick={() => setShow(!show)} />
            <div className={'bg-primary-container shadow rounded p-1 '.concat(show ? '' : 'd-none')}>
                <small>{GUID}</small>
            </div>
        </div>
    )
}
