import {
  ActivityIndicator,
  Dimensions,
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

const {width, height} = Dimensions.get('window');

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

const CategorizedBookItem = (props: any) => {
  const navigation = useNavigation<any>();

  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

  const [isLoading, setLoading] = useState(true);

  const {bookData, category_id} = props;

  //console.log('User Data : ' + userData);
  //console.log('Book Data : ' + bookData);
  //console.log('Rating Data : ' + ratingData);

  const getUserData = async () => {
    axios
      .get('http://192.168.43.55:5555/users/getUser/' + bookData.user_id, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
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
      .get('http://192.168.43.55:5555/ratings/getRating/' + bookData.user_id, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
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
    getUserData();
    getRatingData();
    setLoading(false);
  }, []);

  const onPress = () => {
    navigation.navigate('BookScreen', {
      bookData: bookData,
      userData: userData,
      ratingData: ratingData,
    });
  };

  return (
    <>
      {category_id === bookData.category_id ? (
        <Pressable style={styles.root} onPress={onPress}>
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
              <Text style={styles.yayineviYazar}>Yazar: {bookData.author}</Text>
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
        </Pressable>
      ) : null}
    </>
  );
};

export default CategorizedBookItem;

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
    width: width * 0.25,
    height: width * 0.375,
    marginVertical: 10,
    resizeMode: 'contain',
    flex: 4,
  },
  title: {
    fontSize: width * 0.045,
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
    fontSize: width * 0.035,
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
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
    fontWeight: '600',
    numberOfLines: 2,
    color: '#F4C430',
  },
  numOfRating: {
    fontSize: width * 0.04,
    fontWeight: '400',
    marginLeft: 5,
    color: '#929292',
  },
});
