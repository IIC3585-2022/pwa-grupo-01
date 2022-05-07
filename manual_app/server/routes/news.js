var express = require('express');
var router = express.Router();
const Sequelize = require("sequelize");
const Subscription = require("../models").subscription;
const News = require("../models").news;

/* GET news listing. */
router.get('/', async function(req, res, next) {
  const news = await News.findAll({});
  
  res.send(news);
});

router.post("/", async function (req, res, next) {
  const data = req.body;
  const news = await News.create(data);
  req.io.emit("news", data);
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
          req.push_notifications.sendNotification(
              real_subscription,
              JSON.stringify(data)
              //"Hola"
          ).catch(function(){
              
          });
      })
  })
  console.log(news)
  res.send(news);
})

router.post('/delete', async function(req, res, next) {
  await News.destroy({where: {id: req.body.id}});
  res.sendStatus(200);
});

module.exports = router;
