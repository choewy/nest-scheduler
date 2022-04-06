import withStyles from "@mui/styles/withStyles";
import IconButton from '@mui/material/IconButton';
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem";
import SidebarContentItems from "./SidebarContentItems";

const styles = (theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
});

const drawerWidth = 240;

const SideBar = (props) => {
    const { classes, open, user, sideBarClose, signinDialogOpen } = props;
    const contentItemProps = { user, sideBarClose, signinDialogOpen };

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}>
            <div className={classes.drawerHeader}>
                <ListItem >
                    {user ? `${user.name}(${user.email})` : "방문자"}
                </ListItem>
                <IconButton onClick={sideBarClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            {/* <SideBarMainItems /> */}
            <Divider />
            <SidebarContentItems {...contentItemProps} />
        </Drawer>
    );
};

export default withStyles(styles)(SideBar);