import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../actions/action.auth';
import { SignInErrors } from '../../configs/error.config';
import { EmailSubmitExp, PasswordSubmitExp } from '../../configs/expr.config';

const InputProps = {
    email: {
        type: 'email',
        name: 'email',
        placeholder: "이메일 주소"
    },
    password: {
        type: 'password',
        name: 'password',
        placeholder: '비밀번호'
    }
};

const SignInPage = () => {
    // Redirect Hook
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    // 상태 변경 핸들러
    const stateChangedHandler = (e) => {
        const { target: { name, value } } = e;
        setState({ ...state, [name]: value });
    };

    // 로그인 시도 핸들러
    const signInHandler = async (e) => {
        e.preventDefault();

        const { email, password } = state;

        if (!EmailSubmitExp.test(email)) return alert(SignInErrors['email']);
        if (!PasswordSubmitExp.test(password)) return alert(SignInErrors['password']);

        const body = { email, password };
        const { payload: { ok, message } } = await signInUser(body);

        if (!ok) return alert(message);
        return navigate('/chat');
    };

    // 렌더링
    return (
        <div>
            로그입 페이지
            <form onSubmit={signInHandler}>
                <div>
                    <input {...InputProps.email}
                        value={state.email}
                        onChange={stateChangedHandler} />
                </div>
                <div>
                    <input {...InputProps.password}
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