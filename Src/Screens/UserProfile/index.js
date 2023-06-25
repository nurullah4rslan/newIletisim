import {View, Text, Dimensions, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
import Header from '../../Components/header';
import ROUTES from '../../Configs/routes';
import {networkPaths, axiosApiInstance as axios} from '@service';
export default function UserProfile(props, route) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [user, setUser] = useState([]);
  const [bolum, setBolum] = useState([]);
  const [name, setName] = useState('');

  const User = async () => {
    axios
      .get(networkPaths.USER_PROFILE + props.route.params.id)
      .then(async function (responseJson) {
        if (responseJson.data) {
          console.log('responseJson.data', responseJson.data);
          setUser(responseJson.data.user[0]);
          setBolum(responseJson.data.bolum_adi[0]);
          setName(responseJson.data.user[0].name);
        } else {
          console.warn('first');
        }
      })
      .catch(error => {
        console.log(error, 'ERROR');
      });
  };
  useEffect(() => {
    User();
  }, []);

  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1'},
      ]}>
      <Header head_title={'Profil'} onpress={() => navigation.goBack()} />
      <View
        style={{
          height:
            Platform.OS === 'android'
              ? windowHeight * 0.125
              : windowHeight * 0.07,
        }}></View>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          top: windowHeight * 0.125,
          zIndex: 1,
        }}>
        <View
          style={{
            backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
            width: windowHeight * 0.15,
            height: windowHeight * 0.15,
            borderRadius: windowHeight * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: windowHeight * 0.005,
            borderColor: 'white',
            shadowOffset: {width: 5, height: 5},
            elevation: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: windowHeight * 0.09,
              fontWeight: 'bold',
            }}>
            {name.substring(0, 1)}
          </Text>
        </View>
        <View style={{width: windowWidth, alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: windowHeight * 0.025,
              fontWeight: 'bold',
            }}>
            {user.name}
          </Text>
        </View>
        <View style={{width: windowWidth, alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: windowHeight * 0.02,
            }}>
            {user.email}
          </Text>
        </View>
        <View
          style={{
            width: windowWidth,
            alignItems: 'center',
            top: windowHeight * 0.02,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: windowHeight * 0.02,
            }}>
            {user.type == '1' ? 'Akademisyen' : 'Öğrenci'}
          </Text>
        </View>
        <View
          style={{
            width: windowWidth,
            top: windowHeight * 0.1,
            paddingHorizontal: windowHeight * 0.04,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: windowHeight * 0.02,
            }}>
            Mühendislik Fakültesi/{bolum.bolum_adi}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          height: windowHeight,
        }}></View>
    </View>
  );
}
