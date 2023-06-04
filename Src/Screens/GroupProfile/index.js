import {View, Text, Dimensions, Image, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
import Header from '../../Components/header';
import ROUTES from '../../Configs/routes';
import {networkPaths, axiosApiInstance as axios} from '@service';
import MessageList from '../../Components/messageList';
import Academiclist from '../../Components/academicsList';
export default function GroupProfile(props) {
  const {navigation, route} = props;
  const {Logins} = useSelector(state => state);
  const [list, setList] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const name = route.params.chat_name;
  const message_id = route.params.message_id;
  const List = async () => {
    axios
      .get(networkPaths.GROUP_USER_LIST + message_id)
      .then(async function (responseJson) {
        console.log('responseJson.data', responseJson.data);
        setList(responseJson.data.list);
      })
      .catch(error => {
        console.error(error, 'ERROR');
      });
  };
  useEffect(() => {
    List();
  }, []);
  const renderItem = item => {
    return (
      <Academiclist
        title={item.name}
        onpress={() => {
          axios
            .get(networkPaths.SINGLE_CHAT + item.id)
            .then(async function (responseJson) {
              navigation.navigate(ROUTES.MESSAGE, {
                message_id: responseJson.data.conversation_id,
                chat_name: responseJson.data.receiver_name,
              });
            })
            .catch(error => {
              Alert.alert('Uyarı!', 'Kendinize mesaj atamazsınız.', [
                {
                  text: 'Tamam',
                  onPress: () => null,
                  style: 'cancel',
                },
              ]);
            });
        }}
        profileOnpress={() => {
          item.type == '0'
            ? Logins.type == '1' &&
              navigation.navigate(ROUTES.GROUP_PROFILE, {
                id: item.ders_id,
                message_id: item.id,
                chat_name: item.chat_name,
              })
            : navigation.navigate(ROUTES.USER_PROFILE, {
                id: item.id,
                message_id: item.id,
                chat_name: item.chat_name,
              });
        }}
      />
    );
  };
  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1'},
      ]}>
      <Header head_title={'Grup Detay'} onpress={() => navigation.goBack()} />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          top: windowHeight * 0.05,
        }}>
        <Image
          source={require('../../Assets/Images/fu2.png')}
          style={{width: windowWidth * 0.9, height: windowWidth * 0.5}}
          resizeMode={'cover'}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: windowHeight * 0.7,
          alignItems: 'center',
        }}>
        <View style={{width: '100%', padding: windowHeight * 0.05}}>
          <Text
            style={{
              color: Logins.type == '0' ? '#E90348' : '#01AAC1',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        </View>
        <View
          style={{
            width: '80%',
            borderRadius: 20,
            backgroundColor: 'white',
            padding: 10,
            height: windowHeight * 0.5,
            borderColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1,
              marginBottom: 20,
              borderColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
            }}>
            Kişiler
          </Text>
          <FlatList data={list} renderItem={({item}) => renderItem(item)} />
        </View>
      </View>
    </View>
  );
}
