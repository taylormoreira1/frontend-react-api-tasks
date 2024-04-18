import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserlocalStorage, LoginRequest, setUserlocalStorage } from "./util";


export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserlocalStorage();

        if (user) {
            setUser(user);
        }
    }, [])

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = { name: response.user.name, email: email, token: response.access_token };

        setUser(payload);
        setUserlocalStorage(payload)
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}