import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen/index';
import Message from '../Screens/Message/index';
import AcademicsList from '../Screens/AcademicsList/index';
import ROUTES from '../Configs/routes';
import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import GroupProfile from '../Screens/GroupProfile/index';
import UserProfile from '../Screens/UserProfile/index';
import SectionDetail from '../Screens/SectionDetail/index';
import CommonDetail from '../Screens/CommonDetail/index';
const Stack = createStackNavigator();

export default function AuthNavigator() {
  const state = useSelector(state => state);
  console.log('logings---------->', state);
  const token = 'dolu';
  return (
    <Stack.Navigator
      initialRouteName={
        state.accessToken ? ROUTES.DRAWERNAVIGATOR : ROUTES.LOGIN
      }>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.EXIT}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.ACADEMIC_LIST}
        component={AcademicsList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.DRAWERNAVIGATOR}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.GROUP_PROFILE}
        component={GroupProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.USER_PROFILE}
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.SECTION_DETAIL}
        component={SectionDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.COMMON_DETAIL}
        component={CommonDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
