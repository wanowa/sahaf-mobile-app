import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import TakenBookItem from '../../utils/TakenBookItem';

const {width, height} = Dimensions.get('window');

const TakenBooksScreen = () => {

    const isFocused = useIsFocused();

    const navigation = useNavigation<any>();

    const [takenBookData, setTakenBookData] = useState<any>([]);

    useEffect(() => {
      getData();
    }, [isFocused]);
  
    const getData = async () => {
      let id = 0;
      if(width > 400){
        id = 2;
      }
      else{
        id = 1;
      }
      axios
        .get('http://192.168.43.55:5555/takenBooks/getTakenBooksInfo/' + id, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
        .then(function (response) {
          // handle success
          const data = response.data;
          setTakenBookData(data);
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

    navigation.navigate('Tabs', {screen: 'MyAccountTab'}); // or navigation.goBack()
  };

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={onBackAction} size={30} />
          <Appbar.Content
            title="Aldığım Kitaplar"
            style={styles.appbar_text}
          />
        </Appbar.Header>

        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 250}}
            data={takenBookData}
            keyExtractor={item => item.taken_book_id}
            showsVerticalScrollIndicator={false}
            //nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <TakenBookItem takenBookData={item} />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default TakenBooksScreen;

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
