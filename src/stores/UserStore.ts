import IUser from "interfaces/IUser";
import { makeAutoObservable } from "mobx";

interface IUserStore {
    user: IUser | null
    setUser: (user: IUser) => void
    getUser: () => void
    logout: () => void
}

class UserStore implements IUserStore {
    user: IUser | null;

    constructor() {
        this.user = null
        makeAutoObservable(this)
    }
    public setUser(user: IUser) {
        this.user = user
    };
    public logout() {
        this.user = null
    };
    public getUser() {
        return this.user
    }
}

export default new UserStore();