import AppStoreContext from 'context/AppStoreContext'
import { observer } from 'mobx-react-lite'
import React, { FC, ReactNode, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedLogin: FC<{ children: ReactNode }> = observer(({ children }) => {
    const location = useLocation()
    const appStore = useContext(AppStoreContext)

    return (
        <>
            {!appStore.authToken && !['/login', '/registration'].includes(location.pathname) && <Navigate replace to='/login' />}
            {children}
        </>
    )
})

export default ProtectedLogin