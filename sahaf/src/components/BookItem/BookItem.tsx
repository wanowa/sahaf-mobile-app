import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

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

const BookItem = (props: any) => {
  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

  const [isLoading, setLoading] = useState(true);

  const {bookData} = props;

  //console.log('User Data : ' + userData);
  //console.log('Book Data : ' + bookData);
  //console.log('Rating Data : ' + ratingData);

  const getUserData = async () => {
    axios
      .get('http://192.168.1.103:5555/users/getUser/' + bookData.user_id)
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
      .get('http://192.168.1.103:5555/ratings/getRating/' + bookData.user_id)
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
        //setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
    getRatingData();
    setLoading(false);
    //console.log('User Data : ' + userData.username);
  }, []);

  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://covers.openlibrary.org/b/isbn/' +
                bookData.book_isbn +
                '-L.jpg',
            }}
          />
          <View style={styles.rightContainer}>
            <Text style={[styles.title, {fontFamily: 'Inter-Regular'}]} numberOfLines={3}>
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
                  uri:
                    'https://avatars.dicebear.com/api/avataaars/' +
                    bookData.user_id +
                    '.png',
                }}
              />
              <View style={styles.rightUserContainer}>
                <Text style={styles.username}>{userData.username}</Text>
                <View style={styles.ratingsContainer}>
                  <FontAwesome
                    style={styles.star}
                    name="star"
                    size={20}
                    color={'#e47911'}
                  />
                  {/* <FontAwesome style={styles.star} name="star" size={20} color={'#e47911'} />
                  <FontAwesome style={styles.star} name="star" size={20} color={'#e47911'} />
                  <FontAwesome style={styles.star} name="star" size={20} color={'#e47911'} />
                  <FontAwesome
                    style={styles.star}
                    name="star-half-full"
                    size={20}
                    color={'#e47911'}
                  /> 
              */}
                  <Text style={styles.ratingScore}>{ratingData.score}</Text>
                  <Text style={styles.numOfRating}>({ratingData.number_of_rating})</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default BookItem;

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
    borderWidth: 1,
    borderColor: '#d1d1d1',
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
    //color: '#25d6a2'
  },
  numOfRating: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 5,
  },
});
