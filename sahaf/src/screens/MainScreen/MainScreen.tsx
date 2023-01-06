import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
//import { FlatList } from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, Searchbar, TextInput} from 'react-native-paper';
import BookItem from '../../components/BookItem';
import axios, {isCancel, AxiosError} from 'axios';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../CategoriesScreen';
import LibraryScreen from '../LibraryScreen';
import FavouritesScreen from '../FavouritesScreen';
import MyAccountScreen from '../MyAccountScreen';

const MainScreen = () => 
{
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<any>();
  const [isLoading, setLoading] = useState(true);

  const [bookData, setBookData] = useState<any>([]);
  const [filteredBookData, setFilteredBookData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  //http://192.168.1.103:5555/books/getOthersBook/2

  useEffect(() => {
    getBookData();
    setLoading(false);
  }, []);

  const getBookData = async () => {
    axios
      .get('http://192.168.1.103:5555/books/getOthersBook/2')
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
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
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
