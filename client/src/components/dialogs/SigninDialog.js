import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { EmailSubmitExp, PasswordSubmitExp } from "../../configs/expr.config";
import { SignUpErrors } from "../../configs/error.config";
import { signInUser } from "../../actions/action.auth";

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
    }
});

const initUserFormProps = () => Object.assign({}, {
    email: '',
    password: ''
});

const SigninDialog = (props) => {
    const { classes, open, checkAuth, signinDialogClose } = props;
    const [userForm, setUserForm] = useState(initUserFormProps());

    const userFormChange = (e) => {
        const { target: { name, value } } = e;
        setUserForm({ ...userForm, [name]: value });
    };

    const userFormSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = userForm;
        if (!EmailSubmitExp.test(email)) return alert(SignUpErrors['email']);
        if (!PasswordSubmitExp.test(password)) return alert(SignUpErrors['password']);

        const body = { email, password };
        const { ok, message } = await signInUser(body);

        if (!ok) return alert(message);
        checkAuth();
        signinDialogClose();
    };

    const dialogProps = {
        open,
        onClose: signinDialogClose
    };

    const inputProps = initInputProps(userForm, userFormChange);

    return (
        // TODO : 다이얼로그 디자인 수정 필요
        <Dialog {...dialogProps}>
            <form onSubmit={userFormSubmit}>
                <DialogTitle>로그인</DialogTitle>
                <DialogContent className={classes.content}>
                    <TextField {...inputProps.email} />
                    <TextField {...inputProps.password} />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">로그인</Button>
                    <Button onClick={signinDialogClose}>취소</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default withStyles(styles)(SigninDialog);