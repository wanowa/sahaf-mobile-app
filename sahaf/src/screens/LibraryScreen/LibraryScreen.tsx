import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, SegmentedButtons} from 'react-native-paper';
import {useNavigation, StackActions} from '@react-navigation/native';
import axios from 'axios';
import BookItem from '../../components/BookItem';

const LibraryScreen = () => {
  
  const navigation = useNavigation<any>();
  const [buttonValue, setButtonValue] = useState<any>('0');
  const [myBooks, setMyBooks] = useState<any>([]);
  const [sharedBooks, setSharedBooks] = useState<any>([]);
  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    getMyBooks();
    getSharedBooks();
    getUserData();
    getRatingData();
  }, []);

  const getMyBooks = () => {
    axios
      .get('http://192.168.1.55:5555/books/myBooks/1')
      .then(function (response) {
        // handle success
        const data = response.data;
        setMyBooks(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  };
  const getSharedBooks = () => {
    axios
      .get('http://192.168.1.55:5555/books/myBooksInMarket/1')
      .then(function (response) {
        // handle success
        const data = response.data;
        setSharedBooks(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  };
  const getUserData = async () => {
    axios
      .get('http://192.168.1.55:5555/users/getUser/1')
      .then(function (response) {
        // handle success
        const data = response.data;
        setUserData(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  };

  const getRatingData = async () => {
    axios
      .get('http://192.168.1.55:5555/ratings/getRating/1')
      .then(function (response) {
        // handle success
        const data = response.data;
        setRatingData(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
      });
  };

  const onBackAction = () => {
    // const popAction = StackActions.pop(0);
    // navigation.dispatch(popAction);
  };

  const onAddBook = () => {};

  return (
    <View>
      <View>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Kitaplığım" style={styles.appbar_text} />
          <Appbar.Action
            icon="plus-circle-outline"
            size={40}
            color="#25d6a2"
            onPress={onAddBook}
          />
        </Appbar.Header>

        <SegmentedButtons
          value={buttonValue}
          onValueChange={newValue => setButtonValue(newValue)}
          style={styles.containerStyle}
          density="regular"
          buttons={[
            {
              label: 'Kitaplarım',
              value: '0',
              //style: styles.segmentedButtonStyle,
            },
            {
              label: 'Paylaşılanlar',
              value: '1',
              style: styles.segmentedButtonStyle,
            },
          ]}
        />
      </View>
      <View>
        {buttonValue === '0' ? (
          <View>
            <FlatList
              contentContainerStyle={{paddingBottom: 350}}
              data={myBooks}
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
        ) : (
          <View>
            <FlatList
              contentContainerStyle={{paddingBottom: 250}}
              data={sharedBooks}
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
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
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
  containerStyle: {
    margin: 10,
  },
  segmentedButtonStyle: {},
});
