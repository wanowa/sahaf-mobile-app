import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import axios from 'axios';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GivenBookItem from '../../components/GivenBookItem';

const GivenBooksScreen = () => {
  const navigation = useNavigation<any>();

  const [givenBookData, setGivenBookData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get('http://192.168.1.55:5555/givenBooks/getGivenBooksInfo/1', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setGivenBookData(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const onBackAction = () => {
    navigation.navigate('Tabs', {screen: 'MyAccountTab'});
  };

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={onBackAction} size={30} />
          <Appbar.Content
            title="Verdiğim Kitaplar"
            style={styles.appbar_text}
          />
        </Appbar.Header>

        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 250}}
            data={givenBookData}
            keyExtractor={item => item.given_book_id}
            showsVerticalScrollIndicator={false}
            //nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <GivenBookItem givenBookData={item} />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default GivenBooksScreen;

const styles = StyleSheet.create({
  root: {},
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  appbar_text: {
    marginLeft: 10,
  },
});
