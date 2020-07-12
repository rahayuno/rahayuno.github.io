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
   "endpoint": "https://sg2p.notify.windows.com/w/?token=BQYAAACsDyxqMeYD36CLGP7MrU0c1zkzc28FBY%2bSfT5uJMDBYrLgVIyjQ3ap5qBLHtrdp84%2fKDCPFGI2mnSC5EsDy2f3u92Svt81L7jrEzPI1oNHO8sJZbyhkcoF%2fGb%2bvOH51tv8qguXST39iCeVRN9xMjn%2fyYRxwjccerI%2fxOEEZHz%2bsiQIoybPoy4BTECDqDlaElPajMdPB5Rp2YBNHz4SE1N3v9gV%2fqmx6kDq%2b%2fP06%2fuRncIDVXR87mEIPDf819mTJ18Wxkbu1G8mJvZQr9DAH8%2bM%2fUHLedL36rnoIU9xPGftchqkMMToIBolE2VG7VXK1Ag%3d",
   "keys": {
       "p256dh": "BBH78oEmdRv3lkhtTpab9HIRFdt+WX8RLTwgBKRe81Sjxav+wYSdQXfQ0gdj5PYYco8wccZag0MP4/7uTjN3UPY=",
       "auth": "1K7XVfq4zdA12Zqfc99+TA=="
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