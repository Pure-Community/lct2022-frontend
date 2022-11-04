import { observer } from 'mobx-react-lite'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AppStore from 'stores/AppStore'

const NotLoggedRedirect = observer(() => {
    const location = useLocation()

    return (
        <>{!AppStore.authToken && !['/login', '/registration'].includes(location.pathname) && <Navigate replace to='/login' />}</>
    )
})

export default NotLoggedRedirect