import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './commons/Loading';
import NavBar from './commons/NavBar';
import Footer from './commons/Footer';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SIgnUpPage';
import SignInPage from './pages/SignInPage';
import ChatPage from './pages/ChatPage';

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <NavBar />
            <div className='app-wrapper'>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </div>
            <Footer />
        </Suspense>
    );
};

export default App;