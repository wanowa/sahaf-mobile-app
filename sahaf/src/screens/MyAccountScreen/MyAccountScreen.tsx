import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {StackActions, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyAccountScreen = () => {

  const navigation = useNavigation<any>();

  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

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
        // always executed
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
        // always executed
      });
  };

  useEffect(() => {
    getUserData();
    getRatingData();
  }, []);

  const onKitaplarim = () => {
    console.log('onKitaplarim')

    navigation.navigate('LibraryScreenTab');
  };

  const onTalepEttiklerim = () => {};
  const onTalepEdilenler = () => {};

  const onAyarlar = () => {
    navigation.navigate('SettingScreen');
  };

  const onCikisYap = () => {
    navigation.navigate('HomeScreen');
  };


  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Hesabım" style={styles.appbar_text} />
        <Appbar.Action
          icon="cog-outline"
          size={40}
          color="#25d6a2"
          onPress={onAyarlar}
        />
      </Appbar.Header>
      <View style={styles.userVeKitapAlma}>
        <View style={styles.user}>
          <Avatar.Image
            style={styles.avatar}
            size={64}
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
                  size={25}
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
        <Text style={styles.kitapHakki}>
          Kalan Kitap Alma Hakkınız: {userData.right_to_request_book}
        </Text>
      </View>

      <View style={styles.alVer}>
        <View style={styles.al}>
          <Icon name="cart-arrow-down" color="#25d6a2" size={60} />
          <Text style={styles.alText}>Aldıklarım</Text>
        </View>
        <View style={styles.ver}>
          <Icon name="cart-arrow-up" color="#25d6a2" size={60} />
          <Text style={styles.verText}>Verdiklerim</Text>
        </View>
      </View>

      <View style={styles.digerSekmeler}>
        <List.Item
          style={styles.listItem}
          title={<Text style={{ fontSize: 20 }}>Kitaplarım</Text>}
          left={props => <Icon {...props} name="book-open-page-variant-outline" size={30} />}
          onPress={onKitaplarim}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{ fontSize: 20 }}>Talep Ettiklerim</Text>}
          left={props => <Icon {...props} name="book-plus-multiple-outline" size={30} />}
          onPress={onTalepEttiklerim}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{ fontSize: 20 }}>Talep Edilenler</Text>}
          left={props => <Icon {...props} name="book-minus-multiple-outline" size={30} />}
          onPress={onTalepEdilenler}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{ fontSize: 20 }}>Ayarlar</Text>}
          left={props => <Icon {...props} name="cog-outline" size={30} />}
          onPress={onAyarlar}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{ fontSize: 20 }}>Çıkış Yap</Text>}
          left={props => <Icon {...props} name="logout" size={30} />}
          onPress={onCikisYap}
        />
      </View>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  root: {},
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
  userVeKitapAlma: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  user: {
    flexDirection: 'row',
    margin: 20,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  rightUserContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  username: {
    fontFamily: 'Inter-Bold',
    //fontWeight: '600',
    fontSize: 20,
    color: '#000',
    marginLeft: 10,
    textAlignVertical: 'bottom',
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
  kitapHakki: {
    marginHorizontal: 22,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#323d35',
  },
  alVer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  al: {
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    flex: 1,
    alignItems: 'center',
  },
  ver: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  alText: {
    fontSize: 18,
    color: '#000',
  },
  verText: {
    fontSize: 18,
    color: '#000',
  },
  digerSekmeler: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
