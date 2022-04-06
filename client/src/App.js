import { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/commons/Loading';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from './components/commons/NavBar';
import LandingPage from './components/pages/LandingPage';
import { authUser } from './actions/action.auth';
import SideBar from './components/commons/SideBar';
import Components from './components/Components';
import withStyles from "@mui/styles/withStyles";
import SignupDialog from './components/dialogs/SignupDialog';
import SigninDialog from './components/dialogs/SigninDialog';

const styles = (theme) => ({
    app: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    }
});

const components = Components();

const App = (props) => {
    const { classes } = props;
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [dialogs, setDialogs] = useState({
        signin: false,
        signup: false
    });

    const checkAuth = async () => {
        const { auth, user } = await authUser();
        if (!auth) return setUser(false);
        setUser(user);
    };

    useEffect(() => {
        checkAuth();
        return () => { };
    }, []);

    const sideBarOpen = () => setOpen(true);
    const sideBarClose = () => setOpen(false);
    const signupDialogOpen = () => setDialogs({ signin: false, signup: true });
    const signupDialogClose = () => setDialogs({ signin: false, signup: false });
    const signinDialogOpen = () => setDialogs({ signin: true, signup: false });
    const signinDialogClose = () => setDialogs({ signin: false, signup: false });

    const navBarProps = {
        open,
        user,
        checkAuth,
        sideBarOpen,
        signupDialogOpen,
        signinDialogOpen
    };

    const sideBarProps = {
        open,
        user,
        sideBarClose,
        signinDialogOpen
    };

    const signupDialogProps = {
        open: dialogs.signup,
        checkAuth,
        signupDialogClose
    };

    const signinDialogProps = {
        open: dialogs.signin,
        checkAuth,
        signinDialogClose
    };

    return (
        <Suspense fallback={<Loading />}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar {...navBarProps} />
                <SideBar {...sideBarProps} />
            </Box>
            <Paper className={classes.app}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {
                        components.map((component, key) => {
                            const { path, element } = component;
                            const elementProps = { user };
                            const routeProps = { key, path, element: element(elementProps) };
                            return <Route {...routeProps} />
                        })
                    }
                </Routes>
            </Paper>
            {!user && <SignupDialog {...signupDialogProps} />}
            {!user && <SigninDialog {...signinDialogProps} />}
        </Suspense>
    );
};

export default withStyles(styles)(App);