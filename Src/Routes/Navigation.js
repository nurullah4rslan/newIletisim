import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from '../Redux';
import NavigationService from './NavigationService';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={ref => NavigationService.setTopLevelNavigator(ref)}>
            <AuthNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
