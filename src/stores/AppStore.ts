import { makeAutoObservable } from "mobx";

interface IAppStore {
    // new () : IAppStore
    authToken: string | null
    id: string | null
    setToken: (token: string) => void
    getToken: () => string
    setId: (id: string) => void
}

export class AppStore implements IAppStore {
    authToken: string | null = null
    id: string | null = null

    constructor() {
        let authToken = window.localStorage.getItem('authToken')
        if (authToken && authToken[0] === '"') authToken = authToken.substring(1, authToken.length - 1)
        this.authToken = authToken
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

// export default class AppStore
// export type { IAppStore }