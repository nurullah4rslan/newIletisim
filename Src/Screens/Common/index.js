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
import ROUTES from '../../Configs/routes';
export default function Common({navigation}) {
  const state = useSelector(state => state);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [mainNumbers, setMainNumbers] = useState();
  const [mainNumber, setMainNumber] = useState([]);
  const urlWorldOMeter = 'https://www.firat.edu.tr/tr/page/announcement';

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    fetch(urlWorldOMeter)
      .then(response => response.text())
      .then(data => {
        const html = cheerio.load(data);
        setMainNumbers(getMainNumbers(html));
      })
      .catch(err => console.warn('Something went wrong.', err));
  }
  const getMainNumbers = $ => {
    const mainValues = $('.title a ');
    const mainValues1 = $('.main-color-2-bg ');
    const mainValues2 = $('.blog-item-excerpt ');
    const mainValues3 = $('.title a ');
    const mainValues4 = $('.item-thumbnail img ');
    const newData = [];
    for (i = 0; i < 10; i++) {
      const data = mainValues.eq(i).text().trim();
      const data1 = mainValues1.eq(i).text().trim();
      const data2 = mainValues2.eq(i).text().trim();
      const data3 = mainValues3.eq(i).attr('href');
      const data4 = mainValues4.eq(i).attr('src');
      let main = {
        id: i + 1,
        title: data.replace(/\s+/g, ' '),
        body: data2.replace(/\s+/g, ' '),
        date: data1.replace(/\s+/g, ' '),
        link: data3,
        img: data4,
      };
      newData.push(main);
    }
    setMainNumber(newData);
    const coronavirusCases = mainValues4.eq(0).attr('src');
    const deaths = mainValues.eq(1).text().trim();
    const recovered = mainValues.eq(2).text().trim();
    const coronavirusCases1 = mainValues1.eq(0).text().trim();
    const deaths1 = mainValues1.eq(1).text().trim();
    const recovered1 = mainValues1.eq(2).text().trim();
    const result = {coronavirusCases};
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
        <View
          style={{
            marginVertical: 30,
          }}>
          <FlatList
            data={mainNumber}
            renderItem={({item}) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES.COMMON_DETAIL, {
                        link: item.link,
                        photo: item.img,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      marginVertical: 10,
                      marginHorizontal: 20,
                      backgroundColor: 'white',
                      borderRadius: 25,
                      borderColor: 'black',
                      borderWidth: 1,
                    }}>
                    <View>
                      <Image
                        source={{uri: item.img}}
                        style={{
                          width: windowWidth - 43,
                          height: windowWidth * 0.5,
                          borderTopRightRadius: 25,
                          borderTopLeftRadius: 25,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor:
                          state.personType == 0 ? '#E90348' : '#01AAC1',
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        width: windowWidth - 43,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 17,
                          color: 'white',
                          textAlign: 'center',
                          margin: 10,
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: 'white',
                          textAlign: 'center',
                          margin: 10,
                        }}>
                        {item.body}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        width: windowWidth - 43,
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{
                          backgroundColor:
                            state.personType == 0 ? '#E90348' : '#01AAC1',
                          padding: 15,
                          borderTopRightRadius: 25,
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white'}}>
                          {item.date.substring(0, 10)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
