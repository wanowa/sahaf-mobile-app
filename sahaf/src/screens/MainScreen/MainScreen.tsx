import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
//import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, Searchbar, TextInput} from 'react-native-paper';
import BookItem from '../../utils/BookItem';
import axios, {isCancel, AxiosError} from 'axios';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNavigation, NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {width, height} = Dimensions.get('window');

const MainScreen = (props: any) => 
{

  //const {userId} = props.route.params;

  const isFocused = useIsFocused();

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<any>();
  const [isLoading, setLoading] = useState(true);

  const [bookData, setBookData] = useState<any>([]);
  const [filteredBookData, setFilteredBookData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  //http://192.168.43.55:5555/books/getOthersBook/2

  useEffect(() => {
    getBookData();
    setLoading(false);
  }, [isFocused, bookData]);

  const getBookData = async () => {
    let id = 0;
    if(width > 400){
      id = 2;
    }
    else{
      id = 1;
    }
    //console.log('----' + userId + '----');
    axios
      .get('http://192.168.43.55:5555/books/getOthersBook/' + id, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setBookData(data);
        setFilteredBookData(data);
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

  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = bookData.filter(function (item: any) {
        const itemData = item.book_name
          ? item.book_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredBookData(newData);
      setSearch(text);
    } else {
      setFilteredBookData(bookData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.page}>
        <Appbar.Header style={styles.appbar}>
          <Searchbar
            placeholder="Ara..."
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            style={[styles.input, {backgroundColor: '#fff'}, {marginBottom:5}]}
            elevation={5}
            
          />
          {/* <Appbar.Content title="Giriş Yap" style={styles.appbar_text} /> */}
        </Appbar.Header>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              <FlatList
                contentContainerStyle={{paddingBottom: 250}}
                data={filteredBookData}
                keyExtractor={item => item.book_id}
                showsVerticalScrollIndicator={false}
                //nestedScrollEnabled
                renderItem={({item}) => (
                  <View>
                    <BookItem bookData={item} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  page: {
    width: '100%',
    padding: 10,
  },
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#f2f2f2',
    elevation: 0,
  },
  appbar_text: {
    marginLeft: 10,
  },
  input: {
    marginVertical: 0,
    width: '100%',
    borderRadius: 50,
  },
});
