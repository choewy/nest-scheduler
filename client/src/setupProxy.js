const { createProxyMiddleware } = require('http-proxy-middleware');

// 프록시 미들웨어(/api로 작성된 URI를 http://localhost:5000으로 우회)
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};