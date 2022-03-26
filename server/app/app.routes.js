'use strict';

const { UserRoutes } = require("../user/user.routes");

module.exports = (app) => {
    app.use('/api/auth', UserRoutes)
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });
    };
}