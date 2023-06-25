import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

function header(props) {
  const {head_title, onpress, rightPress, right} = props;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const state = useSelector(state => state);
  return (
    <SafeAreaView>
      <View
        style={{
          width: windowWidth,
          backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1',
          flexDirection: 'row',
          paddingVertical: Platform.OS === 'android' ? 20 : 0,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
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
        {right && (
          <TouchableOpacity onPress={rightPress}>
            <Image
              source={require('../Assets/Images/more.png')}
              style={{
                height: windowHeight * 0.03,
                width: windowHeight * 0.03,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

export default header;
header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  head_title: PropTypes.string,
  onpress: PropTypes.func,
  rightPress: PropTypes.func,
  right: PropTypes.bool,
};

header.defaultProps = {
  style: {},
  head_title: '',
  onpress: () => {},
  rightPress: () => {},
  right: false,
};
