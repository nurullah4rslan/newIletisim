import {View, FlatList, Dimensions, Image, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Academiclist from '../../Components/academicsList';
import ROUTES from '../../Configs/routes';
import {networkPaths, axiosApiInstance as axios} from '@service';
import {useSelector} from 'react-redux';
import Header from '../../Components/header';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function AcademicList(props) {
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {navigation} = props;
  const [message, setMessage] = useState([]);
  const [activity, setActivity] = useState(true);
  const [open, setOpen] = useState(false);
  const Message = async () => {
    axios
      .get(networkPaths.ACADEMIC_LIST)
      .then(async function (responseJson) {
        if (responseJson.data.akademisyenler) {
          setMessage(responseJson.data.akademisyenler);
        } else {
          setActivity(false);
        }
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
          item.type === 0
            ? state.personType == 1 &&
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
        {backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1'},
      ]}>
      <Header
        head_title={'Akademisyen Listesi'}
        onpress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingVertical: 20,
        }}>
        <FlatList
          data={message}
          renderItem={({item}) => renderItem(item)}
          ListEmptyComponent={() => {
            return (
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
                  height: windowHeight * 0.6,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Bu alanda mesajınız bulunmamaktadır.
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
