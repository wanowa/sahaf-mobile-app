import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DemandBookItem from '../../utils/DemandBookItem';
import axios from 'axios';

const DemandsScreen = () => {

  const isFocused = useIsFocused();

  const navigation = useNavigation<any>();

  const [demandBookData, setDemandBookData] = useState<any>([]);

  const onBackAction = () => {
    navigation.navigate('Tabs', {screen: 'MyAccountTab'});
  };

  useEffect(() => {
    console.log('DemandsScreen useEffect');
    getData();
  }, [isFocused, demandBookData]);

  const getData = async () => {
    axios
      .get('http://192.168.43.55:5555/demands/myDemands/1', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        setDemandBookData(data);
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
          <Appbar.Content title="Talep Ettiklerim" style={styles.appbar_text} />
        </Appbar.Header>
      </View>
      <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 100}}
            data={demandBookData}
            keyExtractor={item => item.demand_id}
            showsVerticalScrollIndicator={false}
            //nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <DemandBookItem demandBookData={item} />
              </View>
            )}
          />
      </View>
    </SafeAreaProvider>
  );
};

export default DemandsScreen;

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
