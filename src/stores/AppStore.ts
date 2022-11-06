import { makeAutoObservable } from "mobx";

interface IAppStore {
    // new () : IAppStore
    authToken: string | null
    id: string | null
    setToken: (token: string) => void
    getToken: () => string
    setId: (id: string) => void
}

class AppStore implements IAppStore, Object {
    authToken: string | null = null
    id: string | null = null

    constructor()  {
        this.authToken = window.localStorage.getItem('authToken')
        this.id = window.localStorage.getItem('profileId')
        makeAutoObservable(this)
    };

    public setToken = (token: string) => {
        this.authToken = token
        window.localStorage.setItem('authToken', JSON.stringify(token))
    }

    public getToken = () => {
        return this.authToken?.substring(1, this.authToken.length - 1) ?? ''
    }

    public setId(id: string) {
        this.id = id
        window.localStorage.setItem('profileId', JSON.stringify(id))
    }
}

export default AppStore
export type {IAppStore}