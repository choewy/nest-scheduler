import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
        // 로딩 중
        <Suspense fallback={<Loading />}>
            {/* 네비게이션바 */}
            <NavBar />

            {/* 컨텐츠 */}
            <div className='app-wrapper'>

                {/* 라우터(기존에는 Switch 였음) */}
                <Routes>

                    {/* 랜딩 페이지*/}
                    <Route path="/" element={<LandingPage />} />

                    {/* 회원가입 페이지 */}
                    <Route path="/signup"
                        element={<AuthRoute Component={SignUpPage} reverse={true} />} />

                    {/* 로그인 페이지 */}
                    <Route path="/signin"
                        element={<AuthRoute Component={SignInPage} reverse={true} />} />

                    {/* 채팅 페이지 */}
                    <Route path="/chat"
                        element={<AuthRoute Component={ChatPage} reverse={false} />} />

                    {/* 404 페이지(임시로 Redirect 시킴) */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>

            {/* 푸터 */}
            <Footer />
        </Suspense>
    );
};

export default App;