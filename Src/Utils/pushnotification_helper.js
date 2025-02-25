import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import NavigationService from '../Routes/NavigationService';
import notifee, {AndroidImportance} from '@notifee/react-native';
import ROUTES from '../Configs/routes';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('fcm token:', token);
  } catch (error) {
    console.log('error in creating token');
  }
};

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)

  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: data?.data?.channel_id,
    name: data?.data?.channel_name,
    sound: data?.data?.sound_name,
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data?.notification.title,
    body: data?.notification.body,
    android: {
      channelId,
    },
  });
}

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    onDisplayNotification(remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    const newMessage = remoteMessage.data.conversation_id;
    console.log(
      'Notification caused app to open from background state:',
      newMessage,
    );
    setTimeout(() => {
      NavigationService.navigate(ROUTES.MESSAGE, {
        message_id: newMessage,
        chat_name: remoteMessage.notification.title,
      });
    }, 1200);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}
