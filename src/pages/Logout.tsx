import AppStoreContext from 'context/AppStoreContext'
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import UserStore from 'stores/UserStore'

function Logout() {
    const appStore = useContext(AppStoreContext)

    useEffect(() => {
        UserStore.logout()
        appStore.setId('')
        appStore.setToken('')
    }, [])


    return (
        <Navigate to={'/'} />
    )
}

export default Logout