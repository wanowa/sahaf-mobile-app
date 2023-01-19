import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { withRepeat } from 'react-native-reanimated';



const ProfileInformationsScreen = () => {

  const isFocused = useIsFocused();

  const [userFetched, setUserFetched] = useState(false);
  const [userData, setUserData] = useState<any>([]);

  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const navigation = useNavigation<any>();

  const onBackAction = () => {
    navigation.navigate('SettingScreen');
  };

  const onKaydet = () => {

  }

  const getUserData = async () => {
    axios
      .get('http://192.168.43.55:5555/users/getUser/1', {
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
        // console.log(userData.first_name)
        // console.log(userData.last_name)
        // console.log(userData.username)
        // console.log(userData.email)
        // console.log(userData.phone_number)
        setUserFetched(true);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const setInputFields = () => {
    setUsername(userData.username);
    setFirstName(userData.name);
    setLastName(userData.surname);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
  }

  useEffect  (  () => {
        console.log('ProfileInformationScreen useEffect');   
        getUserData()
        
        setUsername(userData.username);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setPhoneNumber(userData.phone_number);

  }, [isFocused, userData]);

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Profil Bilgilerim" style={styles.appbar_text} />
      </Appbar.Header>
      <ScrollView style={styles.root}>
        <TextInput
          value={first_name}
          onChangeText={setFirstName}
          style={styles.input}
          label="İsim"
          mode="outlined"
          left={
            <TextInput.Icon
              icon="card-account-details-outline" /*iconColor='#25d6a2'*/
            />
          }
        />
        <TextInput
          value={last_name}
          onChangeText={setLastName}
          style={styles.input}
          label="Soyisim"
          mode="outlined"
          left={
            <TextInput.Icon
              icon="card-account-details-outline" /*iconColor='#25d6a2'*/
            />
          }
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          label="Kullanıcı Adı"
          mode="outlined"
          left={
            <TextInput.Icon icon="account-outline" /*iconColor='#25d6a2'*/ />
          }
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          label="Email"
          mode="outlined"
          left={<TextInput.Icon icon="email-outline" /*iconColor='#25d6a2'*/ />}
        />

        <TextInput
          value={phone_number}
          onChangeText={setPhoneNumber}
          style={styles.input}
          label="Telefon Numarası"
          mode="outlined"
          left={<TextInput.Icon icon="phone-outline" /*iconColor='#25d6a2'*/ />}
        />
        <Button
          style={styles.button}
          children="Kaydet"
          mode="text"
          buttonColor="#25d6a2"
          textColor="white"
          onPress={onKaydet}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileInformationsScreen;

const styles = StyleSheet.create({
  root: {
    margin: 20,
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
  input: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    borderColor: '#25D6A2',
    width: '100%',
    alignSelf: 'center',
  },
});
