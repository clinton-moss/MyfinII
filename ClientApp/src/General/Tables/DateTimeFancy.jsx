import React from 'react'
import { Clock } from 'react-bootstrap-icons'

export default function DateTimeFancy({ dt }) {
    if (!dt) return <></>

    const _format = (dt) => {
        if (dt.length > 'YYYY-MM-DDTHH:MM:SS'.length)
            return dt.substring(0, 'YYYY-MM-DDTHH:MM:SS'.length)
        else
            return dt
    }
    return (
        <div className='text-center'>
            <div>

                <Clock />

            </div>
            <small>
                {_format(dt)}
            </small>
        </div>
    )
}
