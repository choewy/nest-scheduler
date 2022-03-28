import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../actions/action.auth";
import { EmailSubmitExp, NameInputExp, NameSubmitExp, PasswordSubmitExp } from "../../configs/expr.config";
import { SignUpErrors } from '../../configs/error.config';

const InputProps = {
    name: {
        type: 'text',
        name: 'name',
        placeholder: "이름(2-5자)"
    },
    email: {
        type: 'email',
        name: 'email',
        placeholder: "이메일 주소"
    },
    password: {
        type: 'password',
        name: 'password',
        placeholder: '비밀번호'
    },
    confirmPassword: {
        type: 'password',
        name: 'confirmPassword',
        placeholder: '비밀번호 확인'
    }
};

const SignUpPage = () => {
    // Redirect Hook
    const navigate = useNavigate();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // 상태 변경 핸들러
    const stateChangedHandler = (e) => {
        const { target: { name, value } } = e;

        // 정규표현식 검사
        switch (name) {
            case 'name':
                if (NameInputExp.test(value)) {
                    setState({ ...state, [name]: value });
                }
                break;
            default:
                setState({ ...state, [name]: value });
                break;
        };
    };

    // 회원가입 시도 핸들러
    const signUpHandler = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = state;

        if (!NameSubmitExp.test(name)) return alert(SignUpErrors['name']);
        if (!EmailSubmitExp.test(email)) return alert(SignUpErrors['email']);
        if (!PasswordSubmitExp.test(password)) return alert(SignUpErrors['password']);
        if (password !== confirmPassword) return alert(SignUpErrors['confirmPassword']);

        const body = { name, email, password };
        const { payload: { ok, message } } = await signUpUser(body);

        if (!ok) return alert(message);
        return navigate('/signin');
    };

    // 렌더링
    return (
        <div>
            회원가입 페이지
            <form onSubmit={signUpHandler}>
                <div>
                    <input {...InputProps.name}
                        value={state.name}
                        onChange={stateChangedHandler} />
                </div>
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
                    <input {...InputProps.confirmPassword}
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