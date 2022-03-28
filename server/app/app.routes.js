'use strict';

const { UserRoutes } = require("../user/user.routes");

// 라우팅 처리
module.exports = (app) => {
    // 사용자 인증 라우터
    app.use('/api/auth', UserRoutes)

    // 배포 상태인 경우 정적 파일 경로 및 웹 페이지 반환
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });
    };
};