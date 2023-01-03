import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appbar, Button, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const navigation = useNavigation<any>();

  const onSignUp = () => {
    console.log('Üye Ol');
  };

  const onBackAction = () => {
    console.log('Geri Dön');
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaProvider>
      <View>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={onBackAction} size={30} />
          <Appbar.Content title="Üye Ol" style={styles.appbar_text} />
        </Appbar.Header>

        <ScrollView style={styles.root}>
          <TextInput
            value={name}
            onChangeText={setName}
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
            value={surname}
            onChangeText={setSurname}
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
            left={
              <TextInput.Icon icon="email-outline" /*iconColor='#25d6a2'*/ />
            }
          />

          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            label="Telefon Numarası"
            mode="outlined"
            left={
              <TextInput.Icon icon="phone-outline" /*iconColor='#25d6a2'*/ />
            }
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            label="Şifre"
            mode="outlined"
            secureTextEntry
            left={
              <TextInput.Icon icon="lock-outline" /*iconColor='#25d6a2'*/ />
            }
          />
          <Button
            style={styles.button}
            children="Üye Ol"
            mode="text"
            buttonColor="#25d6a2"
            textColor="white"
            onPress={onSignUp}
          />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  sahaf: {
    fontFamily: 'AllertaStencil-Regular',
    fontSize: 75,
    color: '#25D6A2',
    textAlign: 'center',
    paddingVertical: 50,
  },
  root: {
    margin: 20,
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
  appbar: {
    margin: 0,
    marginBottom: 0,
    width: '100%',
    zIndex: 1,
  },
  appbar_text: {
    marginLeft: 10,
  },
});
