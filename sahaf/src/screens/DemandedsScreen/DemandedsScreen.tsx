import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DemandedBookItem from '../../components/DemandedBookItem';
import axios from 'axios';

const DemandedsScreen = () => {

    const navigation = useNavigation<any>();

    const [demandedBookData, setDemandedBookData] = useState<any>([]);
  
    const onBackAction = () => {
      navigation.navigate('Tabs', {screen: 'MyAccountTab'});
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      axios
        .get('http://192.168.1.55:5555/demands/demandedsFromYou/1', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        })
        .then(function (response) {
          // handle success
          const data = response.data;
          setDemandedBookData(data);
          //console.log(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
  
        });
    };

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={onBackAction} size={30} />
          <Appbar.Content title="Talep Edilenler" style={styles.appbar_text} />
        </Appbar.Header>
      </View>
      <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 100}}
            data={demandedBookData}
            keyExtractor={item => item.demand_id}
            showsVerticalScrollIndicator={false}
            //nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <DemandedBookItem demandedBookData={item} />
              </View>
            )}
          />
      </View>
    </SafeAreaProvider>
  );
};

export default DemandedsScreen;

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
