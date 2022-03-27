import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './commons/Loading';
import NavBar from './commons/NavBar';
import Footer from './commons/Footer';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ChatPage from './pages/ChatPage';
import AuthRoute from './redirects/AuthRoute';

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <NavBar />
            <div className='app-wrapper'>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup"
                        element={<AuthRoute Component={SignUpPage} reverse={true} />} />
                    <Route path="/signin"
                        element={<AuthRoute Component={SignInPage} reverse={true} />} />
                    <Route path="/chat"
                        element={<AuthRoute Component={ChatPage} reverse={false} />} />
                </Routes>
            </div>
            <Footer />
        </Suspense>
    );
};

export default App;