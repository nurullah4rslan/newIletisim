import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
export default function Common() {
  const {Logins} = useSelector(state => state);
  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1'},
      ]}>
      <View style={{height: 70, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            padding: 20,
          }}>
          Fırat Üniversitesi
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Genel Duyurular</Text>
      </View>
    </View>
  );
}
