import withStyles from "@mui/styles/withStyles";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../actions/action.auth";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const styles = () => ({
    box: {
        flexGrow: 0
    },
    iconButton: {
        padding: 0
    },
    menu: {
        marginTop: 45
    }
});

const NavBarUserMenu = (props) => {
    const { classes, user, checkAuth, signinDialogOpen } = props;
    const { image } = user;

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const menuOpen = (e) => setAnchorEl(e.currentTarget);
    const menuClose = () => setAnchorEl(null);

    const signOut = async () => {
        await signOutUser();
        checkAuth();
        signinDialogOpen();
    };

    const iconButtonProps = {
        className: classes.iconButton,
        onClick: menuOpen
    };

    const avatarProps = {
        sx: { background: '#fff' }
    };

    const menuProps = {
        anchorEl,
        open: Boolean(anchorEl),
        id: "menu-appbar",
        className: classes.menu,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        keepMounted: true,
        transformOrigin: {
            vertical: 'top',
            horizontal: 'right'
        },
        onClose: menuClose
    };

    const menuItems = [
        {
            label: '프로필',
            onClick: () => navigate('/mypage')
        },
        {
            label: '로그아웃',
            onClick: signOut
        }
    ];

    return (
        <Box className={classes.box}>
            <Tooltip title="Open settings">
                <IconButton {...iconButtonProps}>
                    {
                        image
                            ? <Avatar {...avatarProps} src={image} alt="profile" />
                            : (
                                <Avatar {...avatarProps}>
                                    <AccountCircleRoundedIcon color="primary" />
                                </Avatar>
                            )
                    }
                </IconButton>
            </Tooltip>
            <Menu {...menuProps}>
                {
                    menuItems.map((menuItem, key) => {
                        const { label, onClick } = menuItem;
                        const menuItemProps = { key, onClick };
                        return (
                            <MenuItem {...menuItemProps}>
                                <Typography textAlign="center">{label}</Typography>
                            </MenuItem>
                        );
                    })
                }
            </Menu>
        </Box>
    );
};

export default withStyles(styles)(NavBarUserMenu);