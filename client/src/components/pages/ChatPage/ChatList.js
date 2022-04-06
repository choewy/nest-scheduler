import withStyles from "@mui/styles/withStyles";
import ChatListItem from "./ChatListItem";

const styles = () => ({
    list: {
        width: '100%',
        listStyle: 'none',
        padding: 0
    }
});

const ChatList = (props) => {
    const { classes, user, rows } = props;

    return (
        <ul className={classes.list}>
            {rows.map((row, key) => {
                const { sender } = row;
                const itemProps = { key, row, own: user._id === sender._id };
                return <ChatListItem {...itemProps} />;
            })}
        </ul>
    );
};

export default withStyles(styles)(ChatList);