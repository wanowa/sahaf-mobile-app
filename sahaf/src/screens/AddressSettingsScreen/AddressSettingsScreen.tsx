import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Button, HelperText, TextInput} from 'react-native-paper';

const AddressSettingsScreen = () => {
  const navigation = useNavigation<any>();

  const [address, setAddress] = useState('');

  const [isAddressEmpty, setIsAddressEmpty] = useState(false);

  const onBackAction = () => {
    navigation.navigate('SettingScreen');
  };


  const onSaveAddress = () => {
    address == '' ? (setIsAddressEmpty(true)) : (setIsAddressEmpty(false));

    if(!(address == '')){
      Alert.alert(
        'Bilgilendirme',
        'Adresiniz başarıyla değiştirildi.',
        [
            {
                text: 'Tamam',
                onPress: () =>navigation.navigate('SettingScreen'),
                style: 'cancel',
            },
        ],
    );
    }
  };

 

  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Adres Bilgilerim" style={styles.appbar_text} />
      </Appbar.Header>
      <ScrollView style={styles.root}>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          label="Adres"
          mode="outlined"
          multiline={true}
          numberOfLines={6}
          // left={
          //   <TextInput.Icon
          //     icon="card-account-details-outline" /*iconColor='#25d6a2'*/
          //   />
          // }
        />
        <HelperText type="error" visible={isAddressEmpty}>
          Adres Bilgisi Boş Olamaz
        </HelperText>
        <Button
          style={styles.button}
          children="Kaydet"
          mode="text"
          buttonColor="#25d6a2"
          textColor="white"
          onPress={onSaveAddress}
        />
      </ScrollView>
    </View>
  );
};

export default AddressSettingsScreen;

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
