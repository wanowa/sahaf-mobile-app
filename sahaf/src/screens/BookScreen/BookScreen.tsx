import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Avatar, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BookScreen = (props: any) => {
  const {bookData, userData, ratingData} = props.route.params;
  const navigation = useNavigation<any>();

  const onBackAction = () => {
    console.log('Geri Dön');
    navigation.navigate('Tabs');
  };

  const onTalepEt = () => {

  }


  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        {/* <Appbar.Content title="Geri Dön" style={styles.appbar_text} /> */}
      </Appbar.Header>
      <View style={styles.root}>
        <Image
          style={styles.image}
          source={{
            uri: bookData.cover_photo,
          }}
        />
        <Text style={styles.title}>{bookData.book_name}</Text>
        <View style={styles.yayineviYazarContainer}>
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
      <View>
        <Button
          style={styles.button}
          labelStyle={{fontSize: 20}}
          children="Talep Et"
          mode="text"
          buttonColor="#25d6a2"
          textColor="white"
          onPress={onTalepEt}
        />
      </View>
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
  },
  appbar_text: {
    marginLeft: 10,
  },
  root: {
    width: '100%',
  },
  image: {
    width: 300,
    height: 450,
    marginVertical: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    //flex: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    //marginLeft: 50,
    textAlign: 'center',

    // marginBottom: 5,
  },
  yayineviYazarContainer: {
    padding: 10,
    //flex: 7,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  yayineviYazar: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  user: {
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: 60,
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
  button: {
    marginVertical: 10,
    borderColor: '#25D6A2',
    width: '80%',
    alignSelf: 'center',
    fontSize: 20,
},
});
