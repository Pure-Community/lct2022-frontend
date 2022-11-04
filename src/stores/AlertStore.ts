import { makeAutoObservable } from "mobx";

interface IAlert {
    text: string
}

interface IAlertStore {
    alert: IAlert | null
    setAlert: (alert: IAlert) => void
}

class AlertStore implements IAlertStore {
    alert: IAlert | null

    constructor() {
        this.alert = null
        makeAutoObservable(this)
    }

    public setAlert(alert: IAlert) {
        this.alert = alert
    }
}

export default new AlertStore()