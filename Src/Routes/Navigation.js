import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../Redux';
import NavigationService from './NavigationService'
export default function App() {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={ref => NavigationService.setTopLevelNavigator(ref)}>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
