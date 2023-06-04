import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

function header(props) {
  const {head_title, onpress} = props;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {Logins} = useSelector(state => state);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.08,
          backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <TouchableOpacity onPress={onpress}>
            <Image
              source={require('../Assets/Images/back.png')}
              style={{
                height: windowHeight * 0.03,
                width: windowHeight * 0.035,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              {head_title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default header;
