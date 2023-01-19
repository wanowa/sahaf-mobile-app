import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Appbar} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DemandedBookItem from '../../utils/DemandedBookItem';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const DemandedsScreen = () => {
  
    const isFocused = useIsFocused();

    const navigation = useNavigation<any>();

    const [demandedBookData, setDemandedBookData] = useState<any>([]);
  
    const onBackAction = () => {
      navigation.navigate('Tabs', {screen: 'MyAccountTab'});
    };
  
    useEffect(() => {
      getData();
    }, [isFocused, demandedBookData]);
  
    const getData = async () => {
      let id = 0;
      if(width > 400){
        id = 2;
      }
      else{
        id = 1;
      }
      axios
        .get('http://192.168.43.55:5555/demands/demandedsFromYou/' + id, {
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
