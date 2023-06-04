import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

function chatList(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {Logins} = useSelector(state => state);
  const myId = Logins.myId;
  const {text, user_id, user_name} = props;
  return myId == user_id ? (
    <View>
      <View
        style={{
          width: windowWidth,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 15,
            maxWidth: windowWidth * 0.75,
          }}>
          <Text>{text}</Text>
        </View>
        <Image
          source={require('../Assets/Images/triangle.png')}
          style={{
            width: 20,
            height: 20,
            transform: [{rotate: '90deg'}],
            right: 8,
            top: 10,
            tintColor: 'white',
          }}
        />
      </View>
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <View
        style={{
          width: windowWidth,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Image
          source={require('../Assets/Images/triangle.png')}
          style={{
            width: 20,
            height: 20,
            transform: [{rotate: '30deg'}],
            left: 8,
            top: 10,
            tintColor: 'white',
          }}
        />
        <View
          style={{
            maxWidth: windowWidth * 0.75,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 15,
          }}>
          <Text style={{color: 'green', fontWeight: 'bold'}}>{user_name}</Text>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
}

export default chatList;
