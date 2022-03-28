import { useEffect, useState } from "react";
import io from "socket.io-client";
import { CHAT_SERVER } from "../../configs/server.config";

const socket = io.connect(CHAT_SERVER);

const ChatPage = (props) => {
    // AuthRoute로부터 전달받은 사용자 정보
    const { user } = props;

    // 채팅 내역
    const [rows, setRows] = useState([]);

    // 채팅 메시지
    const [message, setMessage] = useState('');

    // 모든 채팅 내역 받는 부분
    useEffect(() => {
        const callback = (chats) => setRows(chats);
        socket.on('load', callback);
        socket.emit('load');
        return () => socket.off('load', callback);
    }, []);

    // 최근 채팅 내역 받는 부분
    useEffect(() => {
        const callback = (chat) => { setRows([...rows, chat]) };
        socket.on('push', callback);
        return () => socket.off('push', callback);
    }, [rows]);

    // 채팅 내용 변경 핸들러
    const chatMessageChangeHandler = (e) => {
        const { target: { value } } = e;
        setMessage(value);
    };

    // 채팅 데이터 송신 핸들러
    const submigChatHandler = (e) => {
        e.preventDefault();

        const { _id, name, image } = user;
        const data = {
            message,
            sender: { _id, name, image }
        };

        socket.emit("push", data);
        setMessage('');
    };

    // 렌더링
    return (
        <div>
            채팅 페이지
            <form onSubmit={submigChatHandler}>
                <div>
                    <input
                        value={message}
                        onChange={chatMessageChangeHandler}
                    />
                </div>
                <div>
                    <button type="submit">보내기</button>
                </div>
            </form>
            <div>
                {rows.map((row, index) => {
                    const {
                        message,
                        createdAt,
                        sender: { name, email, image }
                    } = row;

                    return (
                        <div key={index} style={{ margin: '10px 0' }}>
                            <img alt="img" src={image ? image : "https://gravatar.com/avatar"}></img>
                            <p>{name}({email}) - {createdAt}</p>
                            <p>{message}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatPage;