import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import MessageList from '../../Components/messageList';
import ROUTES from '../../Configs/routes';
import {networkPaths, axiosApiInstance as axios} from '@service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export default function Groups(props) {
  const {Logins} = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {navigation} = props;
  const [message, setMessage] = useState([]);
  const [activity, setActivity] = useState(true);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataIsFinished, setDataIsFinished] = useState(false);
  let refresingForAxios = false;
  const Message = async () => {
    axios
      .get(networkPaths.GROUP_LIST)
      .then(async function (responseJson) {
        if (responseJson.data.conversations) {
          setMessage(responseJson.data.conversations);
          setRefreshing(false);
        } else {
          setActivity(false);
        }
      })
      .catch(error => {
        console.error(error, 'ERROR');
      });
  };
  useEffect(() => {
    Message();
  }, []);

  const renderItem = item => {
    return (
      <MessageList
        title={item.title}
        onpress={() =>
          navigation.navigate(ROUTES.MESSAGE, {
            id: item.ders_id,
            message_id: item.id,
            chat_name: item.chat_name,
          })
        }
        active={item.type == '0' ? (Logins.type == '1' ? true : false) : true}
        profileOnpress={() => {
          item.type == '0'
            ? Logins.type == '1' &&
              navigation.navigate(ROUTES.GROUP_PROFILE, {
                id: item.ders_id,
                message_id: item.id,
                chat_name: item.chat_name,
              })
            : axios
                .get(networkPaths.GROUP_USER_LIST + item.id)
                .then(async function (responseJson) {
                  console.log('responseJson.data', responseJson.data.list);
                  {
                    Logins.myId == responseJson.data.list[0].id
                      ? navigation.navigate(ROUTES.USER_PROFILE, {
                          id: responseJson.data.list[1].id,
                          message_id: responseJson.data.list[1].id,
                          chat_name: item.chat_name,
                        })
                      : navigation.navigate(ROUTES.USER_PROFILE, {
                          id: responseJson.data.list[0].id,
                          message_id: responseJson.data.list[0].id,
                          chat_name: item.chat_name,
                        });
                  }
                })
                .catch(error => {
                  console.error(error, 'ERROR');
                });
        }}
      />
    );
  };
  const Advisory = async () => {
    axios
      .get(networkPaths.ADVISORY)
      .then(async function (responseJson) {
        axios
          .get(networkPaths.SINGLE_CHAT + responseJson.data.list.id)
          .then(async function (responseJson) {
            navigation.navigate(ROUTES.MESSAGE, {
              message_id: responseJson.data.conversation_id,
              chat_name: responseJson.data.receiver_name,
            });
          })
          .catch(error => {
            console.error(error, 'ERROR');
          });
      })
      .catch(error => {
        console.error(error, 'ERROR');
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    setDataIsFinished(false);
    refresingForAxios = true;
    Message();
  };
  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1'},
      ]}>
      {activity ? (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            marginTop: 20,
            paddingVertical: 10,
          }}>
          <FlatList
            data={message}
            renderItem={({item}) => renderItem(item)}
            refreshControl={
              <RefreshControl
                colors={['red']}
                tintColor={'red'}
                refreshing={refreshing}
                onRefresh={() => {
                  onRefresh();
                }}
              />
            }
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            marginTop: 20,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold'}}>
            Bu alanda mesajınız bulunmamaktadır.
          </Text>
        </View>
      )}
      <View
        style={{
          width: windowHeight * 0.43,
          height: windowHeight * 0.83,
          position: 'absolute',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
            borderRadius: 60,
            borderWidth: 5,
            borderColor: 'white',
            shadowOffset: {width: 5, height: 5},
            shadowColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
            elevation: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setOpen(!open)}>
          <Image
            source={require('../../Assets/Images/plus.png')}
            style={
              open
                ? {
                    height: 30,
                    width: 30,
                    tintColor: 'white',
                    transform: [{rotate: '45deg'}],
                  }
                : {height: 30, width: 30, tintColor: 'white'}
            }
          />
        </TouchableOpacity>
      </View>
      {open ? (
        <View
          style={{
            width: windowHeight * 0.25,
            height: windowHeight * 0.81,
            position: 'absolute',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#547A58',
              borderRadius: 60,
              borderWidth: 5,
              borderColor: 'white',
              shadowOffset: {width: 8, height: 8},
              shadowColor: '#547A58',
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate(ROUTES.ACADEMIC_LIST)}>
            <Image
              source={require('../../Assets/Images/classroom.png')}
              style={{height: 25, width: 25, tintColor: 'white'}}
            />
            <Text style={{fontSize: 5, fontWeight: 'bold', color: 'white'}}>
              Akademisyenler
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
      {open ? (
        Logins.type == '0' && (
          <View
            style={{
              width: windowHeight * 0.38,
              height: windowHeight * 0.67,
              position: 'absolute',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#A86464',
                borderRadius: 60,
                borderWidth: 5,
                borderColor: 'white',
                shadowOffset: {width: 5, height: 5},
                shadowColor: '#A86464',
                elevation: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => Advisory()}>
              <Image
                source={require('../../Assets/Images/advisory.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: 'white',
                }}
              />
              <Text style={{fontSize: 5, fontWeight: 'bold', color: 'white'}}>
                Danışman
              </Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View></View>
      )}
    </View>
  );
}
