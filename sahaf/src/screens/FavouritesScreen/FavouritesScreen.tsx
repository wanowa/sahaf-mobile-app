import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BookItem from '../../utils/BookItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const FavouritesScreen = () => {
  
  const isFocused = useIsFocused();


  const navigation = useNavigation<any>();

  const [bookData, setBookData] = useState<any>([]);


  useEffect(() => {
    console.log('FavouritesScreen useEffect');
    getBookData();
  }, [setBookData, isFocused]);

  const getBookData = async () => {
    let id = 0;
    if(width > 400){
      id = 2;
    }
    else{
      id = 1;
    }
    axios
      .get('http://192.168.43.55:5555/favourites/getFavourites/' + id, {
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
    // const popAction = StackActions.pop(0);
    // navigation.dispatch(popAction);
  };

  const onUnfavourite = () => {

  }

  return (
    <View>
      <View>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Favorilerim" style={styles.appbar_text} />
        </Appbar.Header>
      </View>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 350}}
            data={bookData}
            //keyExtractor={item => item.book_id}
            showsVerticalScrollIndicator={false}
            //nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <BookItem bookData={item} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}

export default FavouritesScreen

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
  bookItems: {
    flexDirection: 'row',
  }
})


