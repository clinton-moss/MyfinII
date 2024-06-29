import React, { useEffect, useState } from 'react'
import { XCircle } from 'react-bootstrap-icons'

export default function GeneralModal({ title, onClose, show, children }) {
    const [visible, setVisible] = useState(show)

    useEffect(() => { setVisible(show) }, [show])

    const _handleClose = () => {
        if (onClose) onClose()
        setVisible(false)
    }
    return (
        visible && <div className='d-flex flex-column align-items-center justify-content-center'
            style={{ position: 'absolute', left: '0px', right: '0px', top: '0px', bottom: '0px', background: 'rgba(100,100,100,0.7)' }}>
            <div className='bg-light text-light rounded shadow' style={{ maxHeight: '60vh', maxWidth: '60vw', overflow: 'auto' }}>
                <div className='bg-dark d-flex p-2 rounded '>
                    <div className='flex-grow-1'>{title ? title : ''}</div>
                    <div className='flex-shrink-1'>
                        <button onClick={() => _handleClose()} className='btn text-light'>
                            <XCircle />
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}
