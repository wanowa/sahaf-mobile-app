import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Avatar, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const BookScreen = (props: any) => {
  const {bookData, userData, ratingData} = props.route.params;
  const navigation = useNavigation<any>();

  const onBackAction = () => {
    console.log('Geri Dön');
    navigation.navigate('Tabs');
  };

  const onTalepEt = () => {};

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={width * 0.075} />
        {/* <Appbar.Content title="Geri Dön" style={styles.appbar_text} /> */}
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
        <View style={{paddingBottom: 100, marginTop: 20}}>
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
    backgroundColor: '#fbfbfb'
  },
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
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
    //flex: 4,
  },
  title: {
    fontSize: width * 0.0625,
    fontWeight: '600',
    color: '#000',
    //marginLeft: 50,
    textAlign: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 10,


    // marginBottom: 5,
  },
  bookInfoContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'flex-start',
  },
  yayineviYazarContainer: {
    padding: 10,
    //flex: 7,
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
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#e47911',
    //color: '#25d6a2'
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
});
