import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useSelector} from 'react';
import styles from './styles';
import ROUTES from '../../Configs/routes';
import {networkPaths, axiosApiInstance as axios} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  Token,
  MyId,
  MySection,
  Name,
  PersonType,
  AdvisoryId,
} from '../../Redux/Actions/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
// import DeviceInfo from 'react-native-device-info';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export default function LoginScreen(props) {
  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => {
        console.log(x, 'token');
        setFcmToken(x);
      })
      .catch(e => console.log(e));
  }, []);

  // useEffect(() => {
  //   firebase.messaging().onMessage(response => {
  //     console.log(JSON.stringify(response));
  //     if (Platform.OS !== 'ios') {
  //       showNotification(response.notification);
  //       return;
  //     }
  //     PushNotificationIOS.requestPermissions().then(() =>
  //       showNotification(response.notification),
  //     );
  //   });
  // }, []);

  // const showNotification = (
  //   notification: FirebaseMessagingTypes.Notification,
  // ) => {
  //   PushNotification.localNotification({
  //     title: notification.title,
  //     message: notification.body,
  //   });
  // };

  // DeviceInfo.getUniqueId().then(uniqueId => {
  //   // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
  //   // Android: "dd96dec43fb81c97"
  //   // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
  //   console.log('uniqueId', uniqueId);
  //   setUniqueId(uniqueId);
  // });

  // async function permission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enable =
  //     authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus == messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enable) {
  //     console.log('Authorization status', authStatus);
  //   }
  // }

  // async function GetFCMToke() {
  //   let fcmtoken = AsyncStorage.getItem('fcmtoken');
  //   console.log('first3');
  //   if (!fcmtoken) {
  //     console.log('first2');
  //     try {
  //       console.log('first');
  //       const fcmtoken = await messaging().getToken();
  //       if (fcmtoken) {
  //         console.log('new fcmtoken', fcmtoken);
  //         await AsyncStorage.setItem('fcmtoken', fcmtoken);
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   }
  // }
  // useEffect(() => {
  //   GetFCMToke();
  //   permission();
  // }, []);
  // console.log('uniqueId', uniqueId);

  const dispatch = useDispatch();
  const {navigation} = props;
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const Login = async () => {
    if (user === '' || password === '') {
      Alert.alert('Uyarı!', 'Boş bırakılamaz', [
        {
          text: 'Tamam',
          onPress: () => {},
        },
      ]);
    } else {
      console.log('fcmToken', fcmToken);
      axios
        .post(networkPaths.LOGIN_URL, {
          email: user,
          password: password,
          device_mac_adress: fcmToken,
        })
        .then(async function (responseJson) {
          const response = responseJson.data;
          console.log('response', response);
          if (response.success.token) {
            await AsyncStorage.setItem('accessToken', response.success.token);
            const token = response.success.token;
            const section = response.bolum;
            const id = response.id;
            const names = response.name;
            const type = response.type;
            const advisoryId = response.danisman_id;
            dispatch(Token(token));
            dispatch(MySection(section));
            dispatch(MyId(id));
            dispatch(Name(names));
            dispatch(PersonType(type));
            dispatch(AdvisoryId(advisoryId));
            navigation.navigate(ROUTES.DRAWERNAVIGATOR);
          } else {
            Alert.alert('Yanlış kullanıcı adı veya şifre');
          }
        })
        .catch(error => {
          console.log(error, 'ERROR');
          if (JSON.stringify(error).split('"')[3] == 'Network Error') {
            Alert.alert(
              'Uyarı!',
              'Lütfen internet bağlatınızı kontrol ediniz!',
              [
                {
                  text: 'Tamam',
                  onPress: () => {},
                },
              ],
            );
          } else {
            Alert.alert('Uyarı!', 'Yanlış kullanıcı adı veya şifre', [
              {
                text: 'Tamam',
                onPress: () => {},
              },
            ]);
          }
        });
    }
  };
  return (
    <View style={styles.Container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.ImageContainer}>
            <Image
              source={require('../../Assets/Images/fu2.png')}
              style={styles.LogoImage}
            />
          </View>
          <View style={styles.BarContainer}>
            <View style={styles.Bar}>
              <View>
                <Text style={styles.BarText}>
                  Merkezi Kimlik Doğrulama Servisi
                </Text>
              </View>
              <View style={styles.InputContainer}>
                <View>
                  <TextInput
                    style={styles.Input}
                    placeholder="Kullanıcı Adı"
                    onChangeText={onChangeText => setUser(onChangeText)}
                    keyboardType="email-address"
                  />
                </View>

                <View>
                  <TextInput
                    style={styles.Input}
                    secureTextEntry={true}
                    placeholder="Şifre"
                    onChangeText={onChangeText => setPassword(onChangeText)}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.Button} onPress={() => Login()}>
                  <Text style={styles.ButtomText}>Giriş</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
