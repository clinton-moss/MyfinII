import React, { useState } from 'react'
import FullScreenInfoLoader from '../../General/loader/FullScreenInfoLoader'

const CommonContext = React.createContext()

export function CommonProvider({ children }) {
    const [isProcessing, setProcessing] = useState()
    return (
        <CommonContext.Provider value={{
            setProcessing
        }}>
            {isProcessing && <FullScreenInfoLoader {...isProcessing}/>}
            {children}
        </CommonContext.Provider>
    )
}
export default CommonContext