import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');

  const navigation = useNavigation<any>();

  const onBackAction = () => {
    console.log('Geri Dön');
    navigation.navigate('SettingScreen');
  };

  const onChangePassword = () => {
    console.log('Şifremi Değiştir');
    if (password != passwordAgain) {
      Alert.alert('Uyarı', 'Girdiğiniz şifreler uyuşmuyor.', [
        {
          text: 'Tamam',
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('Bilgilendirme', 'Şifreniz başarıyla değiştirildi.', [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('SettingScreen'),
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <SafeAreaProvider>
      <View>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={onBackAction} size={30} />
          <Appbar.Content title="Şifremi Değiştir" style={styles.appbar_text} />
        </Appbar.Header>
        <ScrollView style={styles.root}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            label="Yeni Şifre"
            mode="outlined"
            secureTextEntry
            left={
              <TextInput.Icon icon="lock-outline" /*iconColor='#25d6a2'*/ />
            }
          />
          <TextInput
            value={passwordAgain}
            onChangeText={setPasswordAgain}
            style={styles.input}
            label="Yeni Şifre (Tekrar)"
            mode="outlined"
            secureTextEntry
            left={
              <TextInput.Icon icon="lock-outline" /*iconColor='#25d6a2'*/ />
            }
          />
          <Button
            style={styles.button}
            children="Şifremi Değiştir"
            mode="text"
            buttonColor="#25d6a2"
            textColor="white"
            onPress={onChangePassword}
          />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  root: {
    margin: 20,
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
  input: {
    marginVertical: 10,
    width: '100%',
  },
});
