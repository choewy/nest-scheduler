import { useState } from "react";

const SignUpPage = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const stateChangedHandler = (e) => {
        const { taget: { name, value } } = e;
        // watcher & pipe

        setState({ ...state, [name]: value });
    };

    const signUpHandler = (e) => {
        e.preventDefault();
        console.log(state);
    };

    return (
        <div>
            회원가입 페이지
            <form onSubmit={signUpHandler}>
                <div>
                    <input type="text"
                        name="name"
                        value={state.name}
                        onChange={stateChangedHandler} />
                </div>
                <div>
                    <input type="email"
                        name="email"
                        value={state.email}
                        onChange={stateChangedHandler} />
                </div>
                <div>
                    <input type="password"
                        name="password"
                        value={state.password}
                        onChange={stateChangedHandler} />
                </div>
                <div>
                    <input type="password"
                        name="confirmPassword"
                        value={state.confirmPassword}
                        onChange={stateChangedHandler} />
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;