import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Appbar, Avatar, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const BookScreen = (props: any) => {

  const isFocused = useIsFocused();

  const {bookData, userData, ratingData} = props.route.params;
  const navigation = useNavigation<any>();


  const [myUserData, setMyUserData] = useState<any>([]);
  const [myBooks, setMyBooks] = useState<any>([]);
  const [favouriteBooks, setFavouriteBooks] = useState<any>([]);
  const [demandBookData, setDemandBookData] = useState<any>([]);
  const [demandedBookData, setDemandedBookData] = useState<any>([]);

  const [isMyBook, setIsMyBook] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isDemand, setIsDemand] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  const getMyUserData = async () => {
    axios
      .get('http://192.168.43.55:5555/users/getUser/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setMyUserData(data);
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

  const getMyBooks = async () => {
    axios
      .get('http://192.168.43.55:5555/books/myBooks/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })

      .then(function (response) {
        // handle success
        const data = response.data;
        setMyBooks(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {});
  };

  const getFavourites = async () => {
    axios
      .get('http://192.168.43.55:5555/favourites/getFavourites/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setFavouriteBooks(data);
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

  const getMyDemands = async () => {
    axios
      .get('http://192.168.43.55:5555/demands/myDemands/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setDemandBookData(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {});
  };

  const getDemandedsFromMe = async () => {
    axios
      .get('http://192.168.43.55:5555/demands/demandedsFromYou/1', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setDemandedBookData(data);
        //console.log(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {});
  };

  const onBackAction = () => {
    console.log('Geri Dön');
    navigation.navigate('Tabs');
  };

  const onTalepEt = () => {
    console.log('onTalepEt');

    if (myUserData.right_to_request_book === 0) {
      Alert.alert(
        'Bilgilendirme',
        'Daha fazla kitap talep etme hakkınız bulunmamaktadır. Kitap talep edebilmek için diğer taleplerinizi iptal edebilir, ya da kitap paylaşabilirsiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      axios
        .post('http://192.168.43.55:5555/demands/demandBook?bookId=' + bookData.book_id + '&userId=' + myUserData.user_id)
        .then(
          response => {
            console.log(response.data);
            setIsDemand(true);
          },
          error => {
            console.log(error);
          },
        );
    }
  };

  const onTalepIptal = () => {
    console.log('onTalepIptal');

    axios
    .post('http://192.168.43.55:5555/demands/undemandBook?bookId=' + bookData.book_id + '&userId=' + myUserData.user_id)
    .then(
      response => {
        console.log(response.data);
        setIsDemand(false);
      },
      error => {
        console.log(error);
      },
    );
  };

  const onFavourite = () => {
    console.log('onFavourite');

    axios
    .post('http://192.168.43.55:5555/favourites/setFavourite?bookId=' + bookData.book_id + '&userId=' + myUserData.user_id)
    .then(
      response => {
        console.log(response.data);
        setIsFavourite(true);
      },
      error => {
        console.log(error);
      },
    );
  };

  const onUnfavourite = () => {
    console.log('onUnfavourite');

    axios
    .post('http://192.168.43.55:5555/favourites/setUnfavourite?bookId=' + bookData.book_id + '&userId=' + myUserData.user_id)
    .then(
      response => {
        console.log(response.data);
        setIsFavourite(false);
      },
      error => {
        console.log(error);
      },
    );
  };

  const onTalepEdenler = () => {
    console.log('onTalepEdenler');
    navigation.navigate('DemandedsScreen');
  };

  const onRafaKaldir = () => {
    console.log('onRafaKaldir');
    axios
      .get('http://192.168.43.55:5555/books/unpublishMarket/' + bookData.book_id, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then(function (response) {
        // handle success
        //console.log(data);
        setIsShared(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  };

  const onPaylas = () => {
    console.log('onPaylas');

    axios
    .get('http://192.168.43.55:5555/books/publishMarket/' + bookData.book_id, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
    .then(function (response) {
      // handle success
      //console.log(data);
      setIsShared(true);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  };

  const onSil = () => {
    console.log('onSil');

    Alert.alert(
      'Uyarı',
      bookData.book_name + ' adlı kitabı silmek istediğinize emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: () => {
            axios
            .get('http://192.168.43.55:5555/books/removeBook/' + bookData.book_id, {
              headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
              },
            })
            .then(function (response) {
              // handle success
              //console.log(data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              navigation.navigate('Tabs', {screen: 'LibraryScreen'});
            });
          },
          style: 'cancel',
        },
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    console.log('BookScreen Use Effect');
    
    getMyUserData();
    getMyBooks();
    getFavourites();
    getMyDemands();
    getDemandedsFromMe();

    setIsMyBook(myBooks.some((book: any) => book.book_id === bookData.book_id));
    setIsShared(
      myBooks.some(
        (book: any) =>
          book.book_id === bookData.book_id && book.is_in_market === 1,
      ),
    );
    setIsFavourite(
      favouriteBooks.some((book: any) => book.book_id === bookData.book_id),
    );
    setIsDemand(
      demandBookData.some((book: any) => book.book_id === bookData.book_id),
    );
  }, [isFocused, myBooks]);


  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={width * 0.075} />
        <Appbar.Content title="Kitap Bilgileri" style={styles.appbar_text} />
        <Appbar.Action
          icon={isFavourite ? 'heart' : 'heart-outline'}
          size={width * 0.1}
          color="red"
          isLeading={false}
          style={{alignContent: 'flex-end', justifyContent: 'center'}}
          onPress={isFavourite ? onUnfavourite : onFavourite}
          disabled={isMyBook}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.root}>
          <Image
            style={styles.image}
            source={{
              uri: bookData.cover_photo,
            }}
          />
          <View style={styles.bookInfoContainer}>
            <Text style={styles.title}>{bookData.book_name}</Text>
            <View style={styles.yayineviYazarContainer}>
              <Text style={styles.yayineviYazar}>Yazar: {bookData.author}</Text>
              <Text style={styles.yayineviYazar}>
                Yayınevi: {bookData.publisher}
              </Text>
            </View>
          </View>

          <View style={styles.user}>
            <Avatar.Image
              style={styles.avatar}
              size={width * 0.15}
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
                    size={width * 0.05}
                    color={'#e47911'}
                  />
                  <Text style={styles.ratingScore}>{ratingData.score}</Text>
                  <Text style={styles.numOfRating}>
                    ({ratingData.number_of_rating})
                  </Text>
                </View>
              ) : (
                <Text style={{marginLeft: 10}}>Değerlendirme Yok</Text>
              )}
            </View>
          </View>
        </View>
        <>
          {isMyBook ? (
            <>
              {isShared ? (
                <View style={styles.doubleButtonContainer}>
                  <Button
                    style={styles.doubleButton}
                    children="Talep Edenler"
                    mode="text"
                    buttonColor="#25d6a2"
                    textColor="white"
                    onPress={onTalepEdenler}
                  />
                  <Button
                    style={styles.doubleButton}
                    children="Rafa Kaldır"
                    mode="outlined"
                    buttonColor="white"
                    textColor="#25d6a2"
                    onPress={onRafaKaldir}
                  />
                </View>
              ) : (
                <View style={styles.doubleButtonContainer}>
                  <Button
                    style={styles.doubleButton}
                    children="Paylaş"
                    mode="text"
                    buttonColor="#25d6a2"
                    textColor="white"
                    onPress={onPaylas}
                  />
                  <Button
                    style={styles.doubleButton}
                    children="Sil"
                    mode="outlined"
                    buttonColor="white"
                    textColor="#25d6a2"
                    onPress={onSil}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              {isDemand ? (
                <View style={styles.buttonContainer}>
                  <Button
                    style={styles.button}
                    children="Talebi İptal Et"
                    mode="outlined"
                    buttonColor="white"
                    textColor="#25d6a2"
                    onPress={onTalepIptal}
                  />
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <Button
                    style={styles.button}
                    labelStyle={{fontSize: width * 0.05}}
                    children="Talep Et"
                    mode="text"
                    buttonColor="#25d6a2"
                    textColor="white"
                    onPress={onTalepEt}
                  />
                </View>
              )}
            </>
          )}
        </>
      </ScrollView>
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // paddingBottom: 250,
    width: '100%',
    backgroundColor: '#fbfbfb',
  },
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
    alignContent: 'space-around',
  },
  appbar_text: {
    marginLeft: 10,
  },
  image: {
    width: width * 0.75,
    height: height * 0.7,
    marginVertical: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.0625,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  bookInfoContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'flex-start',
  },
  yayineviYazarContainer: {
    padding: 10,
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },

  yayineviYazar: {
    fontSize: width * 0.044,
    fontWeight: '400',
    color: '#000',
  },
  user: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  rightUserContainer: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: '600',
    fontSize: width * 0.05,
    color: '#000',
    marginLeft: 10,
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
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#e47911',
  },
  numOfRating: {
    fontSize: width * 0.05,
    fontWeight: '400',
    marginLeft: 5,
    color: '#a4a4a4',
  },
  button: {
    marginVertical: 10,
    borderColor: '#25D6A2',
    width: '80%',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  doubleButton: {
    marginVertical: 10,
    borderColor: '#25D6A2',
    width: '40%',
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  doubleButtonContainer: {
    paddingBottom: 80,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    paddingBottom: 80,
    marginTop: 10,
  },
});
