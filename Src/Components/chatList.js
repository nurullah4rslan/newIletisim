import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {networkPaths, axiosApiInstance as axios} from '@service';

function chatList(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const state = useSelector(state => state);
  const myId = state.myId;
  const [open, setOpen] = useState(false);
  const {text, user_id, user_name, image} = props;
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
          <Text style={{color: 'black'}}>{text}</Text>
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
          {image && (
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => {
                setOpen(true);
              }}>
              <Image
                source={{uri: networkPaths.BASE_URL + image}}
                style={{
                  width: windowWidth * 0.6,
                  aspectRatio: 1.7,
                  resizeMode: 'cover', //cover dene
                }}
              />
            </TouchableOpacity>
          )}
          <Text style={{color: 'black'}}>{text}</Text>
        </View>
        <Modal
          visible={open}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setOpen(false);
          }}>
          <View
            onTouchStart={() => {
              setOpen(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <Image
              source={{uri: networkPaths.BASE_URL + image}}
              style={{
                width: windowWidth,
                marginVertical: 10,
                aspectRatio: 1.3,
                resizeMode: 'contain',
              }}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default chatList;
chatList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
  user_id: PropTypes.string,
  user_name: PropTypes.string,
};

chatList.defaultProps = {
  style: {},
  text: '',
};
