import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ROUTES from '../Configs/routes';
import TopTabNavigator from './TopTabNavigator';
import DrawerContent from './DrawerContent';
import Common from '../Screens/Common/index';
import Section from '../Screens/Section/index';
import LoginScreen from '../Screens/LoginScreen/index';
import {Header} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
          shadowOffset: {width: 0, height: 0},
          elevation: 0,
        },
        headerTitleStyle: {color: 'white', fontSize: 18, width: windowWidth},
        headerTintColor: 'white',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={ROUTES.ALL}
        component={TopTabNavigator}
        options={{title: 'Fırat Üniveritesi İletişim Platformu'}}
      />
      <Drawer.Screen name={ROUTES.COMMON} component={Common} />
      <Drawer.Screen name={ROUTES.SECTION} component={Section} />
    </Drawer.Navigator>
  );
}
