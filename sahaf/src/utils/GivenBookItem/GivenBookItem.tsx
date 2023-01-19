import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface BookItemProps {
  userData: {
    user_id?: any;
    first_name?: any;
    last_name?: any;
    email?: any;
    username?: any;
    password?: any;
    phone_number?: any;
    is_corporate?: any;
    register_date?: any;
    avatar?: any;
    address?: any;
    right_to_request_book?: any;
  };
  bookData: {
    book_id?: Number;
    user_id?: Number;
    book_name?: String;
    author?: String;
    publisher?: String;
    category_id?: Number;
    cover_photo?: String;
    description?: String;
    book_isbn?: String;
    is_in_market?: Number;
  };
  ratingData: {
    user_id?: any;
    number_of_rating?: any;
    score?: any;
  };
}

const GivenBookItem = (props: any) => {
  const navigation = useNavigation<any>();

  const [bookData, setBookData] = useState<any>([]);
  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

  const [isLoading, setLoading] = useState(true);

  const {givenBookData} = props;

  const getBookData = async () => {
    axios
      .get('http://192.168.43.55:5555/books/getBook/' + givenBookData.book_id, {
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
      .catch((errors: any) => {
        // handle error
        console.log(errors);
      })
      .finally(function () {});
  };

  const getUserData = async () => {
    axios
      .get(
        'http://192.168.43.55:5555/users/getUser/' + givenBookData.recipient_id, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
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
        // always executed
      });
  };

  const getRatingData = async () => {
    axios
      .get(
        'http://192.168.43.55:5555/ratings/getRating/' +
          givenBookData.recipient_id, {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          }
      )
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
        // always executed
      });
  };

  useEffect(() => {
    getBookData();
    getUserData();
    getRatingData();
    setLoading(false);
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={{color:'#a4a4a4', marginLeft: 10}}>{givenBookData.deal_date}</Text>
          <View style={styles.root}>
            <Image
              style={styles.image}
              source={{
                uri: bookData.cover_photo,
              }}
            />
            <View style={styles.rightContainer}>
              <Text
                style={[styles.title, {fontFamily: 'Inter-Regular'}]}
                numberOfLines={3}>
                {bookData.book_name}
              </Text>
              <View>
                <Text style={styles.yayineviYazar}>
                  Yazar: {bookData.author}
                </Text>
                <Text style={styles.yayineviYazar}>
                  Yayınevi: {bookData.publisher}
                </Text>
              </View>
              <View style={styles.user}>
                <Avatar.Image
                  style={styles.avatar}
                  size={48}
                  source={{
                    uri: userData.avatar,
                  }}
                />
                <View style={styles.rightUserContainer}>
                  <Text style={styles.username}>{userData.username}</Text>
                  {ratingData ? (
                    <View style={styles.ratingsContainer}>
                      <FontAwesome
                        style={styles.star}
                        name="star"
                        size={20}
                        color={'#F4C430'}
                      />
                      <Text style={styles.ratingScore}>{ratingData.score}</Text>
                      <Text style={styles.numOfRating}>
                        ({ratingData.number_of_rating})
                      </Text>
                    </View>
                  ) : (
                    <Text style={[styles.numOfRating, {marginLeft: 10}]}>
                      Değerlendirme Yok
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default GivenBookItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 150,
    marginVertical: 10,
    resizeMode: 'contain',
    flex: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    //fontFamily: 'Inter-Regular',
    // marginBottom: 5,
  },
  rightContainer: {
    padding: 10,
    flex: 7,
    justifyContent: 'space-between',
  },
  yayineviYazar: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  user: {
    flexDirection: 'row',
    marginTop: 5,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  rightUserContainer: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    //textAlignVertical: 'center',
    marginLeft: 10,
    //color: '#25d6a2'
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  star: {
    marginRight: 5,
  },
  ratingScore: {
    fontSize: 16,
    fontWeight: '600',
    numberOfLines: 2,
    color: '#F4C430',
  },
  numOfRating: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 5,
    color: '#929292',
  },
});
