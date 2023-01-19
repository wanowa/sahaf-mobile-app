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
import BookItem from '../../utils/BookItem';
import axios, {isCancel, AxiosError} from 'axios';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  useNavigation,
  NavigationContainer,
  useIsFocused,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategorizedBookItem from '../../utils/CategorizedBookItem';




const CategorizedBookScreen = (props: any) => {
  const {category_id, category_name} = props.route.params;

  const isFocused = useIsFocused();

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<any>();
  const [isLoading, setLoading] = useState(true);

  const [bookData, setBookData] = useState<any>([]);

  //http://192.168.43.55:5555/books/getOthersBook/2

  useEffect(() => {
    console.log(category_name);
    getBookData();
    setLoading(false);
  }, [isFocused]);

  const getBookData = async () => {
    axios
      .get('http://192.168.43.55:5555/books/getOthersBook/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setBookData(data);
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

  return (
    <SafeAreaProvider>
      <View style={styles.page}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.navigate('Tabs', {screen: 'CategoriesScreen'})} />
        <Appbar.Content title={category_name} style={styles.appbar_text} />
      </Appbar.Header>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
              <FlatList
                contentContainerStyle={{paddingBottom: 250}}
                data={bookData}
                keyExtractor={item => item.book_id}
                showsVerticalScrollIndicator={false}
                //nestedScrollEnabled
                renderItem={({item}) => (
                  <View>
                    <CategorizedBookItem
                      bookData={item}
                      category_id={category_id}
                    />
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

export default CategorizedBookScreen;

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
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
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
