import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authUser } from "../../actions/action.auth";

const AuthRoute = ({ Component, reverse }) => {
    // 인증 상태, 사용자 정보 
    const [state, setState] = useState({
        auth: null,
        user: {},
    });

    // GET /api/auth => 인증 상태 및 사용자 정보
    useEffect(() => {
        const checkAuth = async () => {
            const { payload } = await authUser();
            setState({ auth: payload.auth, user: { ...payload } });
        };

        checkAuth();
        return () => { }
    }, []);

    // 인증 상태 확인중
    if (state.auth === null) return <></>

    // 방문자인 경우(회원가입, 로그인 페이지 이동 가능)
    if (reverse) {
        if (state.auth === false) return <Component />
        if (state.auth === true) return <Navigate to="/" />
    }

    // 회원인 경우(채팅 페이지 이동 가능)
    if (state.auth === false) return <Navigate to="/signin" />
    if (state.auth === true) return <Component user={state.user} />
};

export default AuthRoute;