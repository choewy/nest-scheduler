import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import withStyles from "@mui/styles/withStyles";
import NavBarUserMenu from './NavBarUserMenu';
import NavBarVisitorMenu from './NavBarVisitorMenu';

const styles = () => ({});

const navBarTitle = 'React Chat App';

const NavBar = (props) => {
    const { open, user, checkAuth, sideBarOpen, signupDialogOpen, signinDialogOpen } = props;
    const iconButtonProps = {
        size: "large",
        edge: "start",
        color: "inherit",
        "aria-label": "open drawer",
        onClick: sideBarOpen,
        sx: {
            mr: 2,
            ...(open && { display: 'none' })
        }
    };

    const titleProps = {
        noWrap: true,
        variant: "h6",
        component: "div",
        sx: {
            flexGrow: 1,
            display: {
                xs: 'none',
                sm: 'block'
            }
        }
    };

    const userMenuProps = { checkAuth, signinDialogOpen };
    const visitorMenuProps = {
        signupDialogOpen, signinDialogOpen
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton {...iconButtonProps}>
                    <MenuIcon />
                </IconButton>
                <Typography {...titleProps}>
                    {navBarTitle}
                </Typography>
                {
                    user
                        ? <NavBarUserMenu {...userMenuProps} />
                        : <NavBarVisitorMenu {...visitorMenuProps} />
                }
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(NavBar);