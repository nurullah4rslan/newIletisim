import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

function messageList(props) {
  const {title, id, onpress, profileOnpress, active} = props;
  const state = useSelector(state => state);
  return (
    <TouchableOpacity onPress={onpress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingRight: 10}}>
            {/* <Image
              source={require('../Assets/Images/Profile.png')}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                shadowOpacity: {width: 5, height: 5},
              }}
            /> */}
            {active ? (
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  shadowOffset: {width: 5, height: 5},
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    state.personType == 0 ? '#E90348' : '#01AAC1',
                }}
                onPress={profileOnpress}>
                <Text
                  style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                  {title.substring(0, 1)}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  shadowOffset: {width: 5, height: 5},
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    state.personType == 0 ? '#E90348' : '#01AAC1',
                }}
                onPress={profileOnpress}>
                <Text
                  style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                  {title.substring(0, 1)}
                </Text>
              </View>
            )}
          </View>
          <View style={{paddingLeft: 10}}>
            <View>
              <Text style={{fontWeight: 'bold', color: 'black'}}>{title}</Text>
            </View>
          </View>
        </View>
        {/* <View
          style={{
            backgroundColor: 'green',
            padding: 5,
            borderRadius: 20,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{id}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

export default messageList;
messageList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  id: PropTypes.string,
  onpress: PropTypes.func,
  profileOnpress: PropTypes.func,
  active: PropTypes.bool,
};

messageList.defaultProps = {
  style: {},
  title: '',
  onpress: () => {},
  profileOnpress: () => {},
  active: false,
};

const styles = StyleSheet.create({});
