import { AUTH_USER, SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER } from "../actions/action-types"

const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            return { ...state, signUpData: action.payload }
        case SIGNIN_USER:
            return { ...state, loginData: action.payload }
        case SIGNOUT_USER:
            return { ...state }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
}

export default AuthReducer;