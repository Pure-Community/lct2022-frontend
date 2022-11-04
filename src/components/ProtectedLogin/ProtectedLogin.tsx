import { observer } from 'mobx-react-lite'
import React, { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import AppStore from 'stores/AppStore'

const ProtectedLogin: FC<{ children: ReactNode }> = observer(({ children }) => {
    const location = useLocation()

    return (
        <>
            {!AppStore.authToken && !['/login', '/registration'].includes(location.pathname) && <Navigate replace to='/login' />}
            {children}
        </>
    )
})

export default ProtectedLogin