const Sequelize = require("sequelize");
const Subscription = require("./models").subscription;

function sockets_config(app, io, webpush) {
    io.on("connection", (socket) => {
        console.log("user connected");
        socket.on("news", async (data) => {
            console.log(data);
            socket.broadcast.emit("news", data);
            await Subscription.findAll({}).then(function(subscriptions) {
                subscriptions.forEach(function(subscription){
                    const {endpoint, expirationTime, keys_auth, keys_p256dh} = subscription;
                    real_subscription = {
                        endpoint,
                        expirationTime,
                        keys: {
                        auth: keys_auth,
                        p256dh: keys_p256dh
                        }
                    }
                    webpush.sendNotification(
                        real_subscription,
                        JSON.stringify(data)
                        //"Hola"
                    ).catch(function(){
                        
                    });
                })
            })
        });
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
