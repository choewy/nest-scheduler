import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { EmailSubmitExp, NameInputExp, NameSubmitExp, PasswordSubmitExp } from "../../configs/expr.config";
import { SignUpErrors } from "../../configs/error.config";
import { signUpUser } from "../../actions/action.auth";

const styles = () => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0'
    }
});

const initInputProps = (state, handler) => ({
    name: {
        type: 'text',
        name: 'name',
        placeholder: "이름(2-5자)",
        autoComplete: 'off',
        value: state.name,
        onChange: handler
    },
    email: {

        type: 'email',
        name: 'email',
        placeholder: "이메일 주소",
        autoComplete: 'off',
        value: state.email,
        onChange: handler
    },
    password: {

        type: 'password',
        name: 'password',
        placeholder: "비밀번호",
        autoComplete: 'off',
        value: state.password,
        onChange: handler
    },
    confirmPassword: {

        type: 'password',
        name: 'confirmPassword',
        placeholder: "비밀번호 확인",
        autoComplete: 'off',
        value: state.confirmPassword,
        onChange: handler
    }
});

const initUserFormProps = () => Object.assign({}, {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const SignupDialog = (props) => {
    const { classes, open, checkAuth, signupDialogClose } = props;
    const [userForm, setUserForm] = useState(initUserFormProps());

    const userFormChange = (e) => {
        const { target: { name, value } } = e;
        switch (name) {
            case 'name':
                if (NameInputExp.test(value)) {
                    setUserForm({ ...userForm, [name]: value });
                }
                break;
            default:
                setUserForm({ ...userForm, [name]: value });
                break;
        };
    };

    const userFormSubmit = async (e) => {
        const { name, email, password, confirmPassword } = userForm;
        if (!NameSubmitExp.test(name)) return alert(SignUpErrors['name']);
        if (!EmailSubmitExp.test(email)) return alert(SignUpErrors['email']);
        if (!PasswordSubmitExp.test(password)) return alert(SignUpErrors['password']);
        if (password !== confirmPassword) return alert(SignUpErrors['confirmPassword']);

        const body = { name, email, password };
        const { ok, message } = await signUpUser(body);

        if (!ok) return alert(message);
        checkAuth();
        signupDialogClose();
    };

    const dialogProps = {
        open,
        onClose: signupDialogClose
    };

    const inputProps = initInputProps(userForm, userFormChange);

    return (
        // TODO : 다이얼로그 디자인 수정 필요
        <Dialog {...dialogProps}>
            <form onSubmit={userFormSubmit}>
                <DialogTitle>회원가입</DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField {...inputProps.name} />
                    <TextField {...inputProps.email} />
                    <TextField {...inputProps.password} />
                    <TextField {...inputProps.confirmPassword} />
                </DialogContent>
                <DialogActions>
                    <Button type='submit'>완료</Button>
                    <Button onClick={signupDialogClose}>취소</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default withStyles(styles)(SignupDialog);