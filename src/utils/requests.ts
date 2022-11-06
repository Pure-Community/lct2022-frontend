import axios from "axios"
import AlertStore from "stores/AlertStore"

const API = 'http://194.87.98.202:8000/api/'

const handleError = (e: any) => {
    if (e.response.status === 401) {
        window.localStorage.removeItem('authToken')
        window.localStorage.removeItem('profileId')
    }
    if (e.response) {
        AlertStore.setAlert({ text: e.response.data.message })
        return { data: e.response.data, error: true }
    } else if (e.request) {
        AlertStore.setAlert({ text: 'Ошибка при отправке запроса' })
    } else {
        AlertStore.setAlert({ text: 'Ошибка при отправке запроса' })
    }

    return { data: {}, error: true }
}

const sendRequest = async (method: "get" | 'post', url: string, body?: {}, headers?: {}) => {
    if (method === "get") {
        return await axios
            .get(`${API}${url}`, headers)
            .then(responce => responce.data)
            .catch(handleError)
    } else {
        console.log('post');
        return await axios
            .post(`${API}${url}`, body, headers)
            .then(responce => responce.data)
            .catch(handleError)
    }
}

export { sendRequest, API }