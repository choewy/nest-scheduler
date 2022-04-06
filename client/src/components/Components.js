import { Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ChatIcon from '@mui/icons-material/Chat';

const Components = () => ([
    {
        label: '실시간 채팅',
        path: '/chat',
        to: '/chat',
        auth: true,
        icon: <ChatIcon />,
        element: (props) => {
            const { user } = props;
            if (user === null) return <></>
            if (user === false) return <Navigate to="/" />
            return <ChatPage {...props} />;
        },
    }
]);

export default Components;