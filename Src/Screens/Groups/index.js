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
import Menu from '../../Components/menu';
import {useSelector} from 'react-redux';

export default function Groups(props) {
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {navigation} = props;
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataIsFinished, setDataIsFinished] = useState(false);
  let refresingForAxios = false;
  const Message = async () => {
    axios
      .get(networkPaths.GROUP_LIST)
      .then(async function (responseJson) {
        setMessage(responseJson.data.conversations);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error, 'ERROR');
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
        active={item.type === 0 ? (state.personType == 1 ? true : false) : true}
        profileOnpress={() => {
          item.type === 0
            ? state.personType == 1 &&
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
                    state.myId == responseJson.data.list[0].id
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
                  console.log(error, 'ERROR');
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
            console.log(error, 'ERROR');
          });
      })
      .catch(error => {
        console.log(error, 'ERROR');
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
        {backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1'},
      ]}>
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
          ListEmptyComponent={
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
          }
        />
        <View style={{width: windowWidth * 0.95, alignItems: 'flex-end'}}>
          <Menu
            onpress={() => navigation.navigate(ROUTES.ACADEMIC_LIST)}
            Advisory={Advisory}
          />
        </View>
      </View>
    </View>
  );
}
