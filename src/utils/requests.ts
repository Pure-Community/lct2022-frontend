import axios from "axios"
import AlertStore from "stores/AlertStore"

const API = 'http://194.87.98.202:8000/api/'

const handleError = (e: any) => {
    if (e.responce) {
        AlertStore.setAlert({ text: e.data.message })
    } else if (e.request) {
        AlertStore.setAlert({ text: 'Ошибка при отправке запроса' })
    } else {
        AlertStore.setAlert({ text: 'Ошибка при отправке запроса' })
    }

    return { requestSuccess: false }
}

const sendRequest = async (method: "get" | 'post', url: string, body?: {}) => {
    if (method === "get") {
        return await axios
            .get(`${API}${url}`)
            .then(responce => responce.data)
            .catch(handleError)
    } else {
        console.log('post');
        return await axios
            .post(`${API}${url}`, body)
            .then(responce => responce.data)
            .catch(handleError)
    }
}

export { sendRequest, API }