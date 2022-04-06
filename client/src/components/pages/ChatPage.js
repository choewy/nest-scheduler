import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatList from "./ChatPage/ChatList";
import withStyles from "@mui/styles/withStyles";

const URL = process.env.NODE_ENV === 'production'
    ? `https://${window.location.host}`
    : 'http://localhost:5000';

const socket = io.connect(URL);

const styles = () => ({
    wrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatList: {
        display: 'flex',
        minWidth: 400,
        maxWidth: 600,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'top',
        maxHeight: 700,
        overflowY: 'auto',
        margin: '20px 0',
        backgroundColor: '#9AACBC'
    }
});

const ChatPage = (props) => {
    const { classes, user } = props;
    const [rows, setRows] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const callback = (chats) => setRows(chats);
        socket.on('load', callback);
        socket.emit('load');
        return () => socket.off('load', callback);
    }, []);

    useEffect(() => {
        const callback = (chat) => { setRows([...rows, chat]) };
        socket.on('push', callback);
        return () => socket.off('push', callback);
    }, [rows]);

    const chatMessageChangeHandler = (e) => {
        const { target: { value } } = e;
        setMessage(value);
    };

    const chatMessageKeyDown = (e) => {
        const { shiftKey, keyCode } = e;
        if (!shiftKey & keyCode === 13) {
            e.preventDefault();
            submitChatHandler();
        };
    };

    const submitChatHandler = () => {
        const { _id, name, image } = user;
        const data = {
            message,
            sender: { _id, name, image }
        };
        if (message === '') return;
        socket.emit("push", data);
        setMessage('');
    };

    const listProps = { user, rows };
    return (
        <div className={classes.wrapper}>
            <div className={classes.chatList} >
                <ChatList {...listProps} />
            </div>
            <div>
                <div>
                    <textarea
                        value={message}
                        onChange={chatMessageChangeHandler}
                        onKeyDown={chatMessageKeyDown} />
                </div>
                <div>
                    <button onClick={submitChatHandler}>보내기</button>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(ChatPage);