import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import ROUTES from '../Configs/routes';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
export default function DrawerContents(props) {
  const {Logins} = useSelector(state => state);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <DrawerContentScrollView>
        <TouchableOpacity
          style={{width: 50, height: 50}}
          onPress={() =>
            props.navigation.dispatch(DrawerActions.closeDrawer())
          }>
          <Image
            source={require('../Assets/Images/Close.png')}
            style={{
              height: 48,
              width: 48,
              tintColor: 'black',
            }}
          />
        </TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            source={require('../Assets/Images/Profile.png')}
            style={{
              width: 120,
              height: 120,
              shadowOffset: {width: 5, height: 5},
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
              padding: 5,
            }}>
            {Logins.name}
          </Text>
        </View>
      </DrawerContentScrollView>
      <View style={{flex: 2}}>
        <ScrollView>
          <DrawerItem
            labelStyle={{color: 'black'}}
            label={'Anasayfa'}
            onPress={() => props.navigation.navigate(ROUTES.HOME)}
          />
          <DrawerItem
            labelStyle={{color: 'black'}}
            label={'Bölüm Duyuruları'}
            onPress={() => props.navigation.navigate(ROUTES.SECTION)}
          />
          <DrawerItem
            labelStyle={{color: 'black'}}
            label={'Genel Duyurular'}
            onPress={() => props.navigation.navigate(ROUTES.COMMON)}
          />
          <DrawerItem
            labelStyle={{color: 'black'}}
            label={'Çıkış'}
            onPress={() => {
              Alert.alert(
                'Uyarı!',
                'Çıkış yapmak istediğinizden emin misiniz?',
                [
                  {
                    text: 'Hayır',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {
                    text: 'Evet',
                    onPress: async () => {
                      props.navigation.navigate(ROUTES.EXIT);
                      await AsyncStorage.setItem('accessToken', null);
                    },
                  },
                ],
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    width: 34,
    height: 30,
    backgroundColor: '#e9ebf0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    left: 10,
  },
});
