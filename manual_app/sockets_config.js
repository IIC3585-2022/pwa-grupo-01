const Sequelize = require("sequelize");
const News = require("./models").news;

function sockets_config(app, io, webpush) {
    io.on("connection", (socket) => {
        console.log("user connected");
        socket.on("disconnect", (socket) => {
            console.log("user disconnected");
        });
    });
    app.use(function(req, res, next) {
        req.io = io;
        next();
    })
}

module.exports = sockets_config;
