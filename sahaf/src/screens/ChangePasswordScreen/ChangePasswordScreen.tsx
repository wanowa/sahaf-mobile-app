import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

const ChangePasswordScreen = () => {
  const navigation = useNavigation<any>();

  const onBackAction = () => {
    navigation.navigate('SettingScreen');
  };

  return (
    <View style={styles.root}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={onBackAction} size={30} />
        <Appbar.Content title="Şifreni Değiştir" style={styles.appbar_text} />
      </Appbar.Header>
    </View>
  );
};

export default ChangePasswordScreen;

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
});
