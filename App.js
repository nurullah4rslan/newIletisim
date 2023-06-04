import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './Src/Routes/Navigation';
import {
  notificationListeners,
  requestUserPermission,
} from './Src/Utils/pushnotification_helper';

const App = () => {
  useEffect(() => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {
          console.log('res+++++', res);
          if (!!res && res == 'granted') {
            requestUserPermission();
            notificationListeners();
          }
        })
        .catch(error => {
          alert('something wrong');
        });
    } else {
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
