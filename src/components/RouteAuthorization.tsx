import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserlocalStorage } from "../context/AuthProvider/util";

export const RouteAuthorization = ({ children }: { children: JSX.Element }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const user = getUserlocalStorage();

        if (!user) {
            navigate("/");
        }
    }, [])

    return children;
};
