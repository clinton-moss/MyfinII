import React from 'react'

export default function FullScreenInfoLoader({ text, icon }) {
    return (
        <div style={{
            background: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className='bg-light shadow p-3 rounded'>{icon && icon} {text}</div>
        </div>
    )
}
