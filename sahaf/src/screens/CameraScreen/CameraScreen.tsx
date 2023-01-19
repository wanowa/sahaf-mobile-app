import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';

const CameraScreen = (props: any) => {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  const key = '&key=AIzaSyCZvr-vyBMhAj9TJIA0s_2N5l8s_m0sqOQ';

  const {book_name, setBookName, author, setAuthor, publisher, 
  setPublisher, bookIsbn, setBookIsbn, isScanned, setIsScanned} = props.route.params

  const navigation = useNavigation<any>();


  const [bookData, setBookData] = useState<any>();

  useEffect(() => {
    console.log('CameraScreen useEffect');
  }, [bookIsbn]);

  const onSuccess = (e: any) => {
    console.log(e.data);
    setBookIsbn(e.data);
    

    getBookData(e.data);
    navigation.navigate('AddBookScreen');
  };

  const getBookData = async (props: any) => {
    let isbn = props;
    axios
      .get(url + isbn + key)
      .then(function (response) {
        //console.log(url + isbn);

        const data = response.data.items[0].volumeInfo;
        setBookData(data);
        setBookName(data.title);
        setAuthor(data.authors[0]);
        setPublisher(data.publisher);
        setIsScanned(true);
        //console.log('-------34' + data.title + '-------');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        //console.log('-------41' + bookData + '-------');
      });
  };

  const onBackAction = () => {
    navigation.navigate('AddBookScreen');
  };

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Kitap Ekle" style={styles.appbar_text} />
      </Appbar.Header>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
};

export default CameraScreen;

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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
