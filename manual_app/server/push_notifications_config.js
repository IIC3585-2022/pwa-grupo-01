const webpush = require("web-push");

webpush.setVapidDetails(
  'mailto:julian2100.g.g@gmail.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);
function push_notifications_config(app) {
  app.use(function(req, res, next) {
    req.push_notifications = webpush;
    next();
  })
  return webpush;
}

module.exports = push_notifications_config;