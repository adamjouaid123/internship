import { createContext } from "react";

export class UserDataStore {
    token;
    role;


    constructor() {
        const storedToken = localStorage.getItem("token")
        const storedRole = localStorage.getItem("role")
        this.token = storedToken
        this.role = storedRole
        // nekheda mnel localstorage kamen
    }
    
    copy() {
        const copy = new UserDataStore()
        copy.token = this.token
        copy.role = this.role
        return copy
    }


    
    setRole(role) {
        this.role = role
        localStorage.setItem('role', role)
    }

    setToken(token) {
        this.token = token
        localStorage.setItem("token", token)
    }

    clearRole(){
        delete this.role
        localStorage.removeItem('role')
    }

    clearToken() {
        delete this.token
        localStorage.removeItem("token")
    }
}

const UserDataContext = createContext(new UserDataStore())

export { UserDataContext } 
