import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authUser } from "../../actions/action.auth";

const AuthRoute = ({ Component, reverse }) => {
    const [state, setState] = useState({
        auth: null,
        user: {},
    });

    useEffect(() => {
        const checkAuth = async () => {
            const { payload } = await authUser();
            setState({ auth: payload.auth, user: { ...payload } });
        };

        checkAuth();
        return () => { }
    }, []);

    if (state.auth === null) return <></>

    if (reverse) {
        if (state.auth === false) return <Component />
        if (state.auth === true) return <Navigate to="/" />
    }

    if (state.auth === false) return <Navigate to="/signin" />
    if (state.auth === true) return <Component user={state.user} />
};

export default AuthRoute;