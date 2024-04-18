import { Api } from "../../services/api";
import { IUser } from "./types";


export function setUserlocalStorage(user: IUser | null) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserlocalStorage() {
    const json = localStorage.getItem('user');

    if (!json) {
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}

export async function LoginRequest(email: string, password: string): Promise<any | null> {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        const response = await Api.post("/auth/login", formData, config);
        return response.data;
    } catch (error) {
        return null;
    }
}
