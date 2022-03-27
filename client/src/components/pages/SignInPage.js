import { useState } from 'react';

const SignInPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const stateChangedHandler = (e) => {
        const { taget: { name, value } } = e;
        // watcher & pipe

        setState({ ...state, [name]: value });
    };

    const signInHandler = (e) => {
        e.preventDefault();
        console.log(state);
    };

    return (
        <div>
            로그입 페이지
            <form onSubmit={signInHandler}>
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
                    <button type="submit">로그인</button>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;