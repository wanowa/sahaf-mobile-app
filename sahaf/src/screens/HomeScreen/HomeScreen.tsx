import {StyleSheet, Text, View, Image, useWindowDimensions, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window')

const HomeScreen = () => {
  const {fontScale} = useWindowDimensions(); // import useWindowDimensions()
  const styles = makeStyles(fontScale); // pass in fontScale to the StyleSheet
  const navigation = useNavigation<any>();

  const onSignIn = () => {
    console.log('Giriş Yap');
    navigation.navigate('SignInScreen');
  };

  const onSignUp = () => {
    console.log('Kayıt Ol');
    navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.sahaf}>Sahaf</Text>
        <Text style={styles.interRegular}>kitabını bitirdin mi?</Text>
        <Text style={styles.interSemiBold}>paylaş, daha fazlasını al</Text>
        <View style={styles.layout}>
          <Image
            style={[styles.image, {marginTop: 100}]}
            source={require('../../../assets/images/1.jpg')}
          />
          <Image
            style={styles.image}
            source={require('../../../assets/images/2.png')}
          />
          <Image
            style={[styles.image, {marginTop: 100}]}
            source={require('../../../assets/images/3.png')}
          />
          <Image
            style={styles.image}
            source={require('../../../assets/images/4.jpg')}
          />
        </View>
        <View style={styles.tamamen}>
          <Text style={styles.interRegular}>
            Tamamen {''}
            <Text style={[styles.interSemiBold, {fontSize: width * 0.04}]}>
              Ücretsiz!
            </Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 2, backgroundColor: '#a4a4a4'}} />
            <View>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontFamily: 'Inter-Bold',
                  color: '#a4a4a4',
                }}>
                %0 Komisyon
              </Text>
            </View>
            <View style={{flex: 1, height: 2, backgroundColor: '#a4a4a4'}} />
          </View>
          <Text style={[styles.interRegular, {marginTop: -2}]}>
            Komisyon {''}
            <Text style={[styles.interSemiBold, {fontSize: width * 0.06}]}>
              Yok
            </Text>
          </Text>
        </View>
        <Button
          style={styles.button}
          children="Giriş Yap"
          mode="text"
          buttonColor="#25d6a2"
          textColor="white"
          onPress={onSignIn}
        />
        <Text style={styles.uyeDegilMisin}>
          Üye Değil misin?
          <Text style={{color: '#25d6a2'}} onPress={onSignUp}>
            {' '}
            Üye Ol
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const makeStyles = (fontScale: any) =>
  StyleSheet.create({
    sahaf: {
      fontFamily: 'AllertaStencil-Regular',
      fontSize: width * 0.2,
      color: '#25D6A2',
      textAlign: 'center',
      paddingVertical: 10,
    },
    interRegular: {
      marginTop: 10,
      fontFamily: 'Inter-Regular',
      fontSize: width * 0.05,
      color: '#000000',
      textAlign: 'center',
    },
    interSemiBold: {
      fontFamily: 'Inter-SemiBold',
      fontSize: width * 0.07,
      color: '#000000',
      textAlign: 'center',
    },
    image: {
      width: '23%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 20,
    },
    layout: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      marginTop: 100,
    },
    tamamen: {
      marginTop: 100,
    },
    button: {
      marginTop: 40,
      borderColor: '#25D6A2',
      width: '80%',
      alignSelf: 'center',
    },
    uyeDegilMisin: {
      textAlign: 'center',
      marginTop: 20,
      fontFamily: 'Inter-SemiBold',
      fontSize: width * 0.04,
      color: '#000000'
    },
  });
