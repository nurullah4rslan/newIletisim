import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {networkPaths, axiosApiInstance as axios} from '@service';
import ROUTES from '../Configs/routes';
import PropTypes from 'prop-types';
function Menu(props) {
  const {onpress, Advisory} = props;
  const state = useSelector(state => state);
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && state.personType == 0 && (
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#A86464',
            borderRadius: 60,
            borderWidth: 5,
            borderColor: 'white',
            shadowOffset: {width: 5, height: 5},
            shadowColor: '#A86464',
            elevation: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => Advisory()}>
          <Image
            source={require('../Assets/Images/advisory.png')}
            style={{
              height: 30,
              width: 30,
              tintColor: 'white',
            }}
          />
          <Text style={{fontSize: 5, fontWeight: 'bold', color: 'white'}}>
            Danışman
          </Text>
        </TouchableOpacity>
      )}
      <View style={{flexDirection: 'row'}}>
        {open && (
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#547A58',
              borderRadius: 60,
              borderWidth: 5,
              borderColor: 'white',
              shadowOffset: {width: 8, height: 8},
              shadowColor: '#547A58',
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onpress}>
            <Image
              source={require('../Assets/Images/classroom.png')}
              style={{height: 25, width: 25, tintColor: 'white'}}
            />
            <Text style={{fontSize: 5, fontWeight: 'bold', color: 'white'}}>
              Akademisyenler
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
            borderRadius: 60,
            borderWidth: 5,
            borderColor: 'white',
            shadowOffset: {width: 5, height: 5},
            shadowColor: state.personType == 0 ? '#E90348' : '#01AAC1',
            elevation: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginLeft: 10,
          }}
          onPress={() => setOpen(!open)}>
          <Image
            source={require('../Assets/Images/plus.png')}
            style={
              open
                ? {
                    height: 30,
                    width: 30,
                    tintColor: 'white',
                    transform: [{rotate: '45deg'}],
                  }
                : {height: 30, width: 30, tintColor: 'white'}
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Menu;
Menu.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onpress: PropTypes.func,
  Advisory: PropTypes.func,
};

Menu.defaultProps = {
  style: {},
  onpress: () => {},
  Advisory: () => {},
};

const styles = StyleSheet.create({});
