import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../Screens/Home/index';
import Groups from '../Screens/Groups/index';
import Unics from '../Screens/Unics/index';
import ROUTES from '../Configs/routes';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const state = useSelector(state => state);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
          elevation: 0,
        },
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          opacity: 0.3,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        options={{title: 'Gelen Mesajlar'}}
        component={Home}
      />
      <Tab.Screen
        name={ROUTES.GROUPS}
        options={{title: 'Ders Sohbetleri'}}
        component={Groups}
      />
      <Tab.Screen
        name={ROUTES.UNICS}
        options={{title: 'Özel Mesajlar'}}
        component={Unics}
      />
    </Tab.Navigator>
  );
}
