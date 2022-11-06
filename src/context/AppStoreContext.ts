import React from "react"
import { AppStore } from "stores/AppStore"

const AppStoreContext = React.createContext(new AppStore())

export const AppStoreContextProvider = AppStoreContext.Provider
export default AppStoreContext