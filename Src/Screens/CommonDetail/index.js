import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useSelector} from 'react-redux';
import * as cheerio from 'cheerio-without-node-native';
import Header from '../../Components/header';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
export default function SectionDetail({navigation, route}) {
  console.log('route', route.params.link);
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [mainNumbers, setMainNumbers] = useState();
  const [mainNumber, setMainNumber] = useState([]);
  const urlWorldOMeter = route.params.link;

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    fetch(urlWorldOMeter)
      .then(response => response.text())
      .then(data => {
        const html = cheerio.load(data);
        setMainNumbers(getMainNumbers(html));
        console.log('mainNumbers', mainNumbers);
      })
      .catch(err => console.warn('Something went wrong.', err));
  }
  const getMainNumbers = $ => {
    const mainValues = $('.post-content h2 ');
    const mainValues1 = $('.post-content ');
    const mainValues2 = $('.blog-item-meta ');

    const title = mainValues.eq(0).text().trim();
    const body = mainValues1.eq(0).text().trim();
    const date = mainValues2.eq(0).text().trim();
    const body2 = body.replace(title, '');
    const date2 = date.replace('Güncellendiği Tarih: ', '');
    const date3 = date2.replace(' |', '');
    const date4 = date3.replace('-', '.');
    const date5 = date4.replace('-', '.');
    const result = {
      title: title.replace(/\s+/g, ' '),
      body: body2.replace(/\s+/g, ' '),
      date: date5.replace(/\s+/g, ' '),
    };
    return result;
  };
  console.log('mainNumbers', mainNumbers);
  console.log('mainNumber-------', mainNumber);
  return (
    <View
      style={[
        styles.Container,
        {backgroundColor: state.personType == 0 ? '#E90348' : '#01AAC1'},
      ]}>
      <Header
        head_title={'Duyuru Detayı'}
        onpress={() => navigation.goBack()}
      />
      <View style={{height: 50, justifyContent: 'center'}}></View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          alignItems: 'center',
        }}>
        <ScrollView style={{}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: route.params.photo}}
              style={{
                width: windowWidth - 2,
                height: windowWidth * 0.6,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                top: 1,
                marginHorizontal: 1,
              }}
            />
          </View>
          <View
            style={{
              width: windowWidth,
              height: 1,
              backgroundColor: 'black',
            }}></View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                marginHorizontal: 20,
                textAlign: 'center',
                marginVertical: 20,
                color: 'black',
              }}>
              {mainNumbers?.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginHorizontal: 20,
                color: 'black',
              }}>
              {mainNumbers?.body}
            </Text>
            <View style={{alignItems: 'flex-end', margin: 20}}>
              <Text style={{color: 'grey'}}>{mainNumbers?.date.substring(0, 10)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
