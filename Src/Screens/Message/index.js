import {
  ScrollView,
  View,
  FlatList,
  Text,
  TextInput,
  Image,
  Alert,
  Dimensions,
  RefreshControl,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import ChatList from '../../Components/chatList';
import {networkPaths, axiosApiInstance as axios} from '@service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../Components/header';
import socketio, {io} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ROUTES from '../../Configs/routes';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useSelector} from 'react-redux';
import {set} from 'react-native-reanimated';

export default function Message({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [messageDataController, setMessageDataController] = useState([]);
  const [activity, setActivity] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const state = useSelector(state => state);
  const [dataIsFinished, setDataIsFinished] = useState(false);
  let refresingForAxios = false;
  const [data, setData] = useState('');
  const [bar, setBar] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const id = route.params.id;
  const message_id = route.params.message_id;
  const chat_name = route.params.chat_name;
  const type = route.params.type;
  console.log('type--------', type);
  // const socket = socketio.connect('https://b034-88-230-171-249.eu.ngrok.io/');
  // socket.on('connect', function () {
  //   console.log('Bağlandı');
  //   console.log('socket.connected', socket.connected);
  //   setData[data];
  // });
  // console.log('socket', socket);
  // useEffect(() => {
  //   const socket = io('https://651d-88-230-171-249.eu.ngrok.io/:8000');

  //   // Socket.IO olaylarını dinlemek için gereken kodu buraya yazın
  //   // Örneğin:
  //   socket.on('connect', () => {
  //     console.log('Socket.IO bağlantısı başarılı');
  //   });

  //   socket.on('message', data => {
  //     console.log('Yeni mesaj:', data);
  //   });

  //   return () => {
  //     // Komponent temizlenirken Socket.IO bağlantısını kapatın
  //     socket.disconnect();
  //   };
  // }, []);

  const Messages = async () => {
    axios
      .get(networkPaths.GROUP_CHAT + message_id)
      .then(async function (responseJson) {
        setData(responseJson.data.everyone_chat);
        setMessageDataController(responseJson.data.messages);
        //console.log('responseJson.data.messages', responseJson.data.messages);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error, 'ERROR');
      });
  };

  // const timer = setTimeout(() => {
  //   setData(data + 1);
  //   Message();
  // }, 3000);

  useEffect(() => {
    Messages();
    // const interval = setInterval(() => {
    //   console.log('This will run every second!');
    // }, 1000);
    // return () => clearInterval(interval);
  }, [activity]);
  messaging().onMessage(async remoteMessage => {
    console.log('remoteMessageß', remoteMessage);
    setActivity(!activity);
  });

  Keyboard.addListener('keyboardDidShow', e => {
    const keyboardHeight = e.endCoordinates.height;
    setKeyboardHeight(keyboardHeight);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardHeight(0);
  });

  const SendMessage = () => {
    if (message === '') {
      Alert.alert('Uyarı!', 'Mesaj boş göderilemez', [
        {
          text: 'Tamam',
          onPress: () => {},
        },
      ]);
    } else {
      axios
        .post(networkPaths.SEND_CHAT + message_id, {text: message})
        .then(async function (responseJson) {
          setMessage('');
          Messages();
        })
        .catch(error => {
          console.log(error, 'ERROR');
        });
    }
  };
  const Everyone = async () => {
    axios
      .post(networkPaths.EVERYONE_CHAT + message_id, {
        everyone_chat: data === 0 ? 1 : 0,
      })
      .then(async function (responseJson) {
        console.log('responseJson', responseJson.data.mesaj);
        if (
          responseJson.data.mesaj ===
          'Mesaj atma özelliği başarıyla değiştirildi.'
        ) {
          setBar(false);
          onRefresh();
        }
      })
      .catch(error => {
        console.log(error, 'ERROR');
      });
  };

  const renderItem = item => {
    return (
      <ChatList
        text={item.text}
        user_id={item.user_id}
        user_name={item.name}
        image={item.file}
      />
    );
  };
  const onRefresh = () => {
    setRefreshing(true);
    setDataIsFinished(false);
    refresingForAxios = true;
    Messages();
  };

  return (
    <View
      style={{
        backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
      }}>
      <Header
        head_title={chat_name}
        onpress={() => navigation.goBack()}
        right={state.personType == 1 && type === 0 ? true : false}
        rightPress={() => {
          setBar(!bar);
        }}
      />
      <View
        onTouchStart={() => {
          setBar(false);
        }}
        style={{
          height: windowHeight * 0.9 - keyboardHeight,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          backgroundColor: 'gainsboro',
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        }}>
        <FlatList
          inverted
          data={messageDataController}
          renderItem={({item}) => renderItem(item)}
          // refreshControl={
          //   <RefreshControl
          //     colors={['red']}
          //     tintColor={'red'}
          //     refreshing={refreshing}
          //     onRefresh={() => {
          //       onRefresh();
          //     }}
          //   />
          // }
          ListEmptyComponent={
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.8 - keyboardHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Mesaj bulunmamaktadır.</Text>
            </View>
          }
        />
        {data === 1 && state.personType === 0 ? (
          <View>
            <Text>
              Bu sohbete mesaj atma yetkisi yalnızca akademisyene aittir.
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingBottom: 8,
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: 50,
                backgroundColor: 'white',
                borderRadius: 20,
                marginLeft: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <TextInput
                style={{width: '90%'}}
                placeholder="Mesaj Yaz"
                value={message}
                onChangeText={onChangeText => setMessage(onChangeText)}
              />
              <TouchableOpacity>
                <Image
                  source={require('../../Assets/Images/documant.png')}
                  style={{height: 20, width: 20}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                SendMessage();
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                opacity: 0.8,
              }}>
              <Image
                source={require('../../Assets/Images/icon.png')}
                style={{height: 30, width: 30, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {bar && type === 0 && (
        <View
          style={{
            position: 'absolute',
            width: windowWidth,
            alignItems: 'flex-end',
            marginTop: windowHeight * 0.08,
          }}>
          <View style={{backgroundColor: 'white', width: windowWidth * 0.35}}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                Everyone();
              }}>
              <Text>{data === 0 ? 'Sustur' : 'Sesini aç'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
