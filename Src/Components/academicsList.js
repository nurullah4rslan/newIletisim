import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

function messageList(props) {
  const {title, id, onpress, profileOnpress} = props;
  const {Logins} = useSelector(state => state);
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{alignItems: 'center', marginBottom: 10}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          justifyContent: 'space-between',
          borderWidth: 0.7,
          borderRadius: 40,
          paddingHorizontal: 3,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingRight: 10}}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                shadowOpacity: {width: 5, height: 5},
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Logins.type == '0' ? '#E90348' : '#01AAC1',
              }}
              onPress={profileOnpress}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                {title.substring(0, 1)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft: 10}}>
            <View>
              <Text style={{fontWeight: 'bold', color: 'Black'}}>{title}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default messageList;

const styles = StyleSheet.create({});
