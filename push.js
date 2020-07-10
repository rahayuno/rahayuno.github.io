const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BI469e3-WDW0123te5zN2nEmcxam_B42Xzw7ufbXRuAS-9VCuVcneWG_KsclZJByWeu4Lzy9qM72MT8ACyEfDl0",
   "privateKey": "lJwzAOihddVjgOtu-s1kgB8TYtO372OyNsCYEaA8d98"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAACPKeaG5Hjy1jX57TXUAWetBN6deovZbNW%2bs9uxbaYoAl6TfHIo54Z0e3LCm9iqMAt2qhqfXi6vo%2bA5lYcxad6sO6NmCS69%2fT2hwdmVD%2fWYU9lxs7Pre32Bgc9zcAgM4yKmVk3LRxMFoB%2bepRyIBqHyNvygA8iDle4DWW336ttCV%2bWq9c%2b0jOCj10RKO%2bzl7T5kmjg7Cw6pnBByhWkRIgIzH6OW72A8Ljq7VP5DyhFdOhYve%2bQ2paI7rYlOSpBl3ghxaEPV9g1GSxPbO1x05FqASw4ZAGq2h%2bHvDDfEatecKtSmOszTaw62oaiJhV9T4Ag%3d",
   "keys": {
       "p256dh": "BNDURjYFx86JZUw1U75TAj2mnxC4N6tnhZ5vykkl7PsSZP5Wm/xdZ6gQDm39v2P9QOMkp0x7otq78pLBrFrZ4BE=",
       "auth": "MairIkKlqmZsAuTmtIgfmA=="
   }
};

const payload = 'Congratulation! England Soccer now can receive push notification.';
 
const options = {
   gcmAPIKey: '237545889669',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);