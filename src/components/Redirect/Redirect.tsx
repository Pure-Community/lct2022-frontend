import AppStoreContext from 'context/AppStoreContext'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const NotLoggedRedirect = observer(() => {
    const location = useLocation()
    const appStore = useContext(AppStoreContext)

    return (
        <>{!appStore.authToken && !['/login', '/registration'].includes(location.pathname) && <Navigate replace to='/login' />}</>
    )
})

export default NotLoggedRedirect