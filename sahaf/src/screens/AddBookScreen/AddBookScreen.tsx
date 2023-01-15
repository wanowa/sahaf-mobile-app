import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Appbar, Button, HelperText, TextInput} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const AddBookScreen = () => {
  const items = [
    {label: 'Aile', value: 1},
    {label: 'Anı-Mektup-Günlük', value: 2},
    {label: 'Anlatı', value: 3},
    {label: 'Araştırma-İnceleme', value: 4},
    {label: 'Aşk', value: 5},
    {label: 'Astroloji', value: 6},
    {label: 'Bilgisayar-İnternet', value: 7},
    {label: 'Bilim Kurgu', value: 8},
    {label: 'Bilim-Teknoloji-Mühendislik', value: 9},
    {label: 'Biyografi', value: 10},
    {label: 'Çizgi Roman', value: 11},
    {label: 'Çocuk', value: 12},
    {label: 'Deneme-İnceleme', value: 13},
    {label: 'Dergi', value: 14},
    {label: 'Ders Kitapları', value: 15},
    {label: 'Diğer İnançlar', value: 16},
    {label: 'Dünya Klasikleri', value: 17},
    {label: 'Edebiyat', value: 18},
    {label: 'Efsaneler-Destanlar', value: 19},
    {label: 'Eğitim', value: 20},
    {label: 'Eğlence-Mizah', value: 21},
    {label: 'Ekonomi-İş Dünyası', value: 22},
    {label: 'Eleştiri-Kuram', value: 23},
    {label: 'Fantastik', value: 24},
    {label: 'Felsefe-Düşünce', value: 25},
    {label: 'Gençlik', value: 26},
    {label: 'Gezi', value: 27},
    {label: 'Halk Edebiyatı', value: 28},
    {label: 'Hikaye(Öykü)', value: 29},
    {label: 'Hobi', value: 30},
    {label: 'Hukuk', value: 31},
    {label: 'İnsan ve Toplum', value: 32},
    {label: 'İslam', value: 33},
    {label: 'Kadın-Erkek', value: 34},
    {label: 'Kişisel Gelişim', value: 35},
    {label: 'Korku-Gerilim', value: 36},
    {label: 'Kültür', value: 37},
    {label: 'Macera-Aksiyon', value: 38},
    {label: 'Masal', value: 39},
    {label: 'Mitolojiler', value: 40},
    {label: 'Moda', value: 41},
    {label: 'Müzik', value: 42},
    {label: 'Polisiye', value: 43},
    {label: 'Psikoloji', value: 44},
    {label: 'Roman', value: 45},
    {label: 'Sağlık-Tıp', value: 46},
    {label: 'Sanat', value: 47},
    {label: 'Şiir', value: 48},
    {label: 'Siyaset-Politika', value: 49},
    {label: 'Sosyoloji', value: 50},
    {label: 'Söyleşi-Röportaj', value: 51},
    {label: 'Spor', value: 52},
    {label: 'Tarih', value: 53},
    {label: 'Tiyatro', value: 54},
    {label: 'Türk Klasikleri', value: 55},
    {label: 'Yemek', value: 56},
  ];

  const navigation = useNavigation<any>();

  const [category, setCategory] = useState<any>(0);

  const [bookData, setBookData] = useState<any[]>([]);
  const [book_name, setBookName] = useState<any>('');
  const [author, setAuthor] = useState<any>('');
  const [publisher, setPublisher] = useState<any>('');
  const [bookIsbn, setBookIsbn] = useState<any>('');
  // const [description, setDescription] = useState<any>('');

  const [isScanned, setIsScanned] = useState(false);

  const [isBookNameEmpty, setIsBookNameEmpty] = useState(false);
  const [isAuthorEmpty, setIsAuthorEmpty] = useState(false);
  const [isPublisherEmpty, setIsPublisherEmpty] = useState(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);

  useEffect(() => {
    if (book_name === '') {
      setIsBookNameEmpty(true);
    } else {
      setIsBookNameEmpty(false);
    }

    if (author === '') {
      setIsAuthorEmpty(true);
    } else {
      setIsAuthorEmpty(false);
    }

    if (publisher === '') {
      setIsPublisherEmpty(true);
    } else {
      setIsPublisherEmpty(false);
    }

    if (category === 0) {
      setIsCategoryEmpty(true);
    } else {
      setIsCategoryEmpty(false);
    }
  }, [book_name, author, publisher, category]);

  const onBackAction = () => {
    navigation.navigate('Tabs', {screen: 'LibraryScreen'});
  };

  const onTara = () => {
    navigation.navigate('CameraScreen', {
      book_name: book_name,
      setBookName: setBookName,
      author: author,
      setAuthor: setAuthor,
      publisher: publisher,
      setPublisher: setPublisher,
      bookIsbn: bookIsbn,
      setBookIsbn: setBookIsbn,
      isScanned: isScanned,
      setIsScanned: setIsScanned,
    });
  };

  const onKaydet = () => {
    if (book_name === '' || book_name === undefined || book_name === null) {
      setIsBookNameEmpty(true);
    } else {
      setIsBookNameEmpty(false);
    }

    if (author === '' || author === undefined || author === null) {
      setIsAuthorEmpty(true);
    } else {
      setIsAuthorEmpty(false);
    }

    if (publisher === '' || publisher === undefined || publisher === null) {
      setIsPublisherEmpty(true);
    } else {
      setIsPublisherEmpty(false);
    }

    if (category === 0 || category === undefined || category === null) {
      setIsCategoryEmpty(true);
    } else {
      setIsCategoryEmpty(false);
    }

    if (
      !isBookNameEmpty &&
      !isAuthorEmpty &&
      !isPublisherEmpty &&
      !isCategoryEmpty
    ) {
      console.log(
        isBookNameEmpty,
        isAuthorEmpty,
        isPublisherEmpty,
        isCategoryEmpty,
      );
      const book = {
        author: author,
        book_id: 0,
        book_isbn: bookIsbn,
        book_name: book_name,
        category_id: category,
        cover_photo: '',
        description: '',
        is_in_market: 0,
        publisher: publisher,
        user_id: 1,
      };
      console.log('-----153' + items[category - 1].label + '-----');
      const category_name = items[category - 1].label;
      add_book(book, category_name);
    }
  };

  const add_book = (book: any, category_name: any) => {
    // fetch('http://192.168.1.55:5555/books/addBook', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     category_name: category_name,
    //     author: author,
    //     book_id: 0,
    //     book_isbn: bookIsbn,
    //     book_name: book_name,
    //     category_id: category,
    //     cover_photo: '',
    //     description: '',
    //     is_in_market: 0,
    //     publisher: publisher,
    //     user_id: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json));

    // axios({
    //   method: 'post',
    //   url: 'http://192.168.1.55:5555/books/addBook',
    //   data: {
    //     category_name: JSON.stringify(category_name),
    //     book: JSON.stringify(book),
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //     console.log(response.status);
    //     console.log(response.statusText);
    //     if (response.data.status === 'success') {
    //       navigation.navigate('Tabs', {screen: 'LibraryScreen'});
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });


    // http://192.168.1.55:5555/books/addBook?category_name=" + category_name -H "accept: */*" -H "Content-Type: application/json" -d "{ \"author\": \"Arthur\", \"book_id\": 0, \"book_isbn\": \"9786053480563\", \"book_name\": \"Sherlock\", \"category_id\": 0, \"cover_photo\": \"\", \"description\": \"\", \"is_in_market\": 0, \"publisher\": \"Martı\", \"user_id\": 1}


    axios
      .post(
        'http://192.168.1.55:5555/books/addBook?category_name=' + category_name,
        { 
          author: author,
          book_id: 0,
          book_isbn: bookIsbn,
          book_name: book_name,
          category_id: category,
          cover_photo: '',
          description: '',
          is_in_market: 0,
          publisher: publisher,
          user_id: 1,
        })
      .then(
        response => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          if (response.data.status === 'success') {
            navigation.navigate('Tabs', {screen: 'LibraryScreen'});
          }
        },
        error => {
          console.log(error);
        },
      );
  };

  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Kitap Ekle" style={styles.appbar_text} />
      </Appbar.Header>
      <View>
        <Button
          style={styles.qrButton}
          icon="camera"
          mode="contained"
          children="Kitabın Barkodunu Tara"
          //mode="outlined"
          buttonColor="white"
          textColor="#25d6a2"
          onPress={onTara}
        />
        <TextInput
          value={book_name}
          disabled={!isScanned}
          onChangeText={setBookName}
          style={[styles.input, {marginTop: 10}]}
          label="Kitap Adı"
          mode="outlined"
          // left={
          //   <TextInput.Icon
          //     icon="card-account-details-outline" /*iconColor='#25d6a2'*/
          //   />
          // }
        />
        <HelperText
          type="error"
          visible={isBookNameEmpty && isScanned == true}
          style={{marginLeft: 6}}>
          Kitap ismi boş bırakılamaz
        </HelperText>

        <TextInput
          value={author}
          disabled={!isScanned}
          onChangeText={setAuthor}
          style={styles.input}
          label="Yazar"
          mode="outlined"
          // left={
          //   <TextInput.Icon
          //     icon="card-account-details-outline" /*iconColor='#25d6a2'*/
          //   />
          // }
        />
        <HelperText
          type="error"
          visible={isAuthorEmpty && isScanned == true}
          style={{marginLeft: 6}}>
          Yazar ismi boş bırakılamaz
        </HelperText>
        <TextInput
          value={publisher}
          disabled={!isScanned}
          onChangeText={setPublisher}
          style={styles.input}
          label="Yayınevi"
          mode="outlined"
          // left={
          //   <TextInput.Icon icon="account-outline" /*iconColor='#25d6a2'*/ />
          // }
        />
        <HelperText
          type="error"
          visible={isPublisherEmpty && isScanned === true}
          style={{marginLeft: 6}}>
          Yayınevi boş bırakılamaz
        </HelperText>

        <TextInput
          value={bookIsbn}
          disabled={true}
          onChangeText={setBookIsbn}
          style={styles.input}
          label="ISBN Numarası"
          mode="outlined"
          // left={<TextInput.Icon icon="email-outline" /*iconColor='#25d6a2'*/ />}
        />

        <RNPickerSelect
          onValueChange={value => setCategory(value)}
          placeholder={{label: 'Kategori Seçiniz', value: 0}}
          style={pickerSelectStyles}
          items={items}
        />
        <HelperText
          type="error"
          visible={isCategoryEmpty && isScanned === true}
          style={{marginLeft: 6}}>
          Lütfen bir kategori seçiniz
        </HelperText>

        <Button
          style={styles.button}
          mode="text"
          children="Kaydet"
          //mode="outlined"
          buttonColor="#25d6a2"
          textColor="white"
          onPress={onKaydet}
        />
      </View>
    </View>
  );
};

export default AddBookScreen;

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
  qrButton: {
    marginTop: 10,
    width: '90%',
    borderWidth: 2,
    borderColor: '#25D6A2',
    alignSelf: 'center',
  },
  button: {
    marginTop: 25,
    marginLeft: 0,
    borderColor: '#25D6A2',
    borderWidth: 3,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    marginTop: 0,
    width: '90%',
    alignSelf: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white',
    marginTop: 20,
  },
});
