import { makeAutoObservable } from "mobx";

interface IAppStore {
    authToken: string | null
    setToken: (token: string) => void
    getToken: (token: string) => void
}

class AppStore implements IAppStore {
    authToken: string | null = null
    constructor() {
        makeAutoObservable(this)
        this.authToken = window.localStorage.getItem('authToken')
    }

    public setToken = (token: string) => {
        window.localStorage.setItem('token', JSON.stringify(token))
    }

    public getToken = () => {
        return this.authToken?.substring(1, this.authToken.length - 1)
    }
}

export default new AppStore()