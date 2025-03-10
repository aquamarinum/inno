const { JWT } = require('google-auth-library');
const axios = require('axios');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync("/Users/user/downloads/notifki-b353c52a7759.json"));

async function getAccessToken() {

    const jwtClient = new JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        ['https://www.googleapis.com/auth/firebase.messaging']
    );

    const credentials = await jwtClient.authorize();
    return credentials.access_token;
}

async function sendPushNotification(fcmToken) {
    const accessToken = await getAccessToken();

    const message = {
        message: {
            token: fcmToken,
            notification: {
                title: "Новое уведомление!",
                body: "Это тестовое уведомление через FCM v1"
            }
        }
    };

    await axios.post(
        `https://fcm.googleapis.com/v1/projects/notifki/messages:send`,
        message,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    );

    console.log("Уведомление отправлено!");
}

sendPushNotification("ВАШ_FCM_ТОКЕН");
