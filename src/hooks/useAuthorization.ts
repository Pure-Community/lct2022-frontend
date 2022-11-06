import axios from "axios";
import React, {useEffect} from 'react'

function useAuthorization(token: string | null) {
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log(`Bearer ${token}`);
        }
    })
}

export default useAuthorization