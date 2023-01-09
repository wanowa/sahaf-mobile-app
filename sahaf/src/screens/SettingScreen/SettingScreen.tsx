import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingScreen = () => {
  const navigation = useNavigation<any>();

  const onBackAction = () => {
    navigation.navigate('Tabs', {screen: 'MyAccountTab'}); // or navigation.goBack()
  };

  const onProfilBilgilerim = () => {
    navigation.navigate('ProfileInformationsScreen');
  };
  const onSifreAyarlarim = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const onAdresBilgilerim = () => {
    navigation.navigate('AddressSettingsScreen');
  };

  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Ayarlar" style={styles.appbar_text} />
      </Appbar.Header>
      <View style={styles.digerSekmeler}>
        <List.Item
          style={styles.listItem}
          title={<Text style={{fontSize: 20}}>Profil Bilgilerim</Text>}
          left={props => <Icon {...props} name="account-outline" size={30} />}
          onPress={onProfilBilgilerim}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{fontSize: 20}}>Şifreni Değiştir</Text>}
          left={props => <Icon {...props} name="lock-outline" size={30} />}
          onPress={onSifreAyarlarim}
        />
        <List.Item
          style={styles.listItem}
          title={<Text style={{fontSize: 20}}>Adres Bilgilerim</Text>}
          left={props => (
            <Icon {...props} name="map-marker-outline" size={30} />
          )}
          onPress={onAdresBilgilerim}
        />
      </View>
    </View>
  );
};

export default SettingScreen;

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
