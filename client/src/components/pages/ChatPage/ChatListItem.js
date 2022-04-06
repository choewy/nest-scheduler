import { Avatar, ListItemAvatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import withStyles from "@mui/styles/withStyles";

const styles = () => ({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 20px'
    },
    ownItem: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px 20px'
    },
    ownBody: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    listBody: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    avatar: {
        border: '1px solid #ddd'
    },
    otherHead: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'

    },
    name: {
        fontSize: 14,
        fontWeight: 600,
        marginRight: 5,
    },
    email: {
        fontSize: 12,
        fontWeight: 400,
    },
    ownMessage: {
        padding: '10px',
        fontSize: 14,
        backgroundColor: '#fae100',
        borderRadius: '5px',
        marginTop: 5,
        whiteSpace: 'pre-wrap'
    },
    message: {
        padding: '10px',
        fontSize: 14,
        backgroundColor: '#fff',
        borderRadius: '5px',
        marginTop: 5,
        whiteSpace: 'pre-wrap'
    },
    ownTime: {
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 10,
        width: '100%'
    },
    otherTime: {
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 10,
        width: '100%'
    },
});

const ChatListItem = (props) => {
    const { classes, row, own } = props;
    const { message, createdAt, sender } = row;
    const { name, email, image } = sender;

    const time = createdAt.slice(10)

    const avatarProps = { sx: { backgroundColor: '#fff', border: '1px solid #ddd' } };
    const renderAvatar = () => {
        return (
            <ListItemAvatar>
                {image
                    ? <Avatar {...avatarProps} alt="profile" src={image} />
                    : (
                        <Avatar {...avatarProps} >
                            <AccountCircleIcon color="primary" />
                        </Avatar>
                    )}
            </ListItemAvatar>
        );
    };

    if (own) {
        return (
            <li>
                <div className={classes.ownItem}>
                    <div className={classes.ownTime}>
                        {time}
                    </div>
                    <div className={classes.ownBody}>
                        <div className={classes.ownMessage}>
                            {message}
                        </div>
                    </div>
                </div>
            </li >
        );
    }

    return (
        <li >
            <div className={classes.listItem}>
                {renderAvatar()}
                <div className={classes.listBody}>
                    <div className={classes.otherHead}>
                        <div className={classes.name}>
                            {name}
                        </div>
                        <div className={classes.email}>
                            ({email})
                        </div>
                    </div>
                    <div className={classes.message}>
                        {message}
                    </div>
                </div>
                <div className={classes.otherTime}>
                    {time}
                </div>
            </div>
        </li >
    );
};

export default withStyles(styles)(ChatListItem);