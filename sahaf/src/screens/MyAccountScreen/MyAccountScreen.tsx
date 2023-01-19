import {Dimensions, Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {StackActions, useIsFocused, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const MyAccountScreen = () => {
  const navigation = useNavigation<any>();

  const isFocused = useIsFocused();


  const [ratingData, setRatingData] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);

  const getUserData = async () => {
    let id = 0;
    if(width > 400){
      id = 2;
    }
    else{
      id = 1;
    }
    axios
      .get('http://192.168.43.55:5555/users/getUser/' + id, {
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
    let id = 0;
    if(width > 400){
      id = 2;
    }
    else{
      id = 1;
    }
    axios
      .get('http://192.168.43.55:5555/ratings/getRating/' + id, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
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
  }, [setUserData, setRatingData, isFocused]);


  const onAldiklarim = () => {
    navigation.navigate('TakenBooksScreen');
  };

  const onVerdiklerim = () => {
    navigation.navigate('GivenBooksScreen');
  };

  const onKitaplarim = () => {
    console.log('onKitaplarim');

    navigation.navigate('LibraryScreenTab');
  };

  const onTalepEttiklerim = () => {
    navigation.navigate('DemandsScreen');
  };
  const onTalepEdilenler = () => {
    navigation.navigate('DemandedsScreen');
  };

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
          size={width * 0.01}
          color="#25d6a2"
          onPress={onAyarlar}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.userVeKitapAlma}>
          <View style={styles.user}>
            <Avatar.Image
              style={styles.avatar}
              size={width * 0.16}
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
                    size={width * 0.0625}
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
            Kalan Kitap Talep Etme Hakkınız: {userData.right_to_request_book}
          </Text>
        </View>

        <View style={styles.alVer}>
          <Pressable style={styles.al} onPress={onAldiklarim}>
            <Icon name="cart-arrow-down" color="#25d6a2" size={width * 0.16} />
            <Text style={styles.alText}>Aldıklarım</Text>
          </Pressable>
          <Pressable style={styles.ver} onPress={onVerdiklerim}>
            <Icon name="cart-arrow-up" color="#25d6a2" size={width * 0.16} />
            <Text style={styles.verText}>Verdiklerim</Text>
          </Pressable>
        </View>

        <View style={styles.digerSekmeler}>
          <List.Item
            style={styles.listItem}
            title={<Text style={{fontSize: width * 0.05}}>Kitaplarım</Text>}
            left={props => (
              <Icon
                {...props}
                name="book-open-page-variant-outline"
                size={width * 0.075}
              />
            )}
            onPress={onKitaplarim}
          />
          <List.Item
            style={styles.listItem}
            title={
              <Text style={{fontSize: width * 0.05}}>Talep Ettiklerim</Text>
            }
            left={props => (
              <Icon
                {...props}
                name="book-plus-multiple-outline"
                size={width * 0.075}
              />
            )}
            onPress={onTalepEttiklerim}
          />
          <List.Item
            style={styles.listItem}
            title={
              <Text style={{fontSize: width * 0.05}}>Benden Talep Edilenler</Text>
            }
            left={props => (
              <Icon
                {...props}
                name="book-minus-multiple-outline"
                size={width * 0.075}
              />
            )}
            onPress={onTalepEdilenler}
          />
          <List.Item
            style={styles.listItem}
            title={<Text style={{fontSize: width * 0.05}}>Ayarlar</Text>}
            left={props => (
              <Icon {...props} name="cog-outline" size={width * 0.075} />
            )}
            onPress={onAyarlar}
          />
          <List.Item
            style={styles.listItem}
            title={<Text style={{fontSize: width * 0.05}}>Çıkış Yap</Text>}
            left={props => (
              <Icon {...props} name="logout" size={width * 0.075} />
            )}
            onPress={onCikisYap}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    
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
    fontSize: width * 0.05,
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
  kitapHakki: {
    marginHorizontal: 22,
    marginBottom: 20,
    fontSize: width * 0.04,
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
    fontSize: width * 0.045,
    color: '#000',
  },
  verText: {
    fontSize: width * 0.045,
    color: '#000',
  },
  digerSekmeler: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 60
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
