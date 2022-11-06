import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import UserStore from 'stores/UserStore'

function Logout() {
    useEffect(() => {
        UserStore.logout()
    }, [])


    return (
        <Navigate to={'/'} />
    )
}

export default Logout