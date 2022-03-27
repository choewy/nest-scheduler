import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authUser } from "../../actions/action.auth";

const AuthRoute = ({ Component, reverse }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { payload } = await authUser();
            setAuth(payload.auth);
        };

        checkAuth();
        return () => { }
    }, []);

    if (auth === null) return <></>

    if (reverse) {
        if (auth === false) return <Component />
        if (auth === true) return <Navigate to="/" />
    }

    if (auth === false) return <Navigate to="/signin" />
    if (auth === true) return <Component />
};

export default AuthRoute;