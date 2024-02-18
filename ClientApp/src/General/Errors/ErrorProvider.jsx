import React, { useState } from 'react'
const ErrorContext = React.createContext()

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState({ show: false, description: '', title: '', yesAction: undefined, noAction: undefined })

    const _handleSetError = (r) => {
        try {
            if (r.description.response)
                r.description = JSON.stringify(r.description.response.data, null, '\t')
        } catch (e) { }
        setError(r)
    }

    return (
        <ErrorContext.Provider
            value={{
                setError: _handleSetError,
            }}
        >
            {
                error.show ?
                    <div
                        className='position-absolute d-flex align-items-center justify-content-center'
                        style={{ left: 0, right: 0, top: 0, bottom: 0, zIndex: 1000 }}
                    >
                        <div
                            className='bg-danger rounded shadow p-3 text-center text-light d-flex flex-column'
                            style={{ maxWidth: '450px', maxHeight: '450px', overflow: 'auto', zIndex: 102 }}
                        >
                            <div className='flex-shrink-1'>
                                <h3>{error.title}</h3>
                            </div>
                            <div className='flex-grow-1' style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: error.description }} />
                            <div className='flex-shrink-1'>
                                <button
                                    className='btn btn-sm text-light bg-secondary' onClick={() => setError({ ...error, show: false })}>Ok</button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
            {children}
        </ErrorContext.Provider>
    )

}

export default ErrorContext