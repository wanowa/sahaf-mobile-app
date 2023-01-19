import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Appbar, List} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window')


const CategoriesScreen = () => {

  const navigation = useNavigation<any>();

  const [categoriesData, setCategoriesData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const getCategories = async () => {
    axios
      .get('http://192.168.43.55:5555/categories/getCategories/', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
      .then(function (response) {
        // handle success
        const data = response.data;
        const sorted = data.sort((a: any, b: any) => {
          return a.category_id - b.category_id;
        });
        //setCategoriesData(sorted);
        setCategoriesData(sorted);

        //console.log(categoriesData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {

      });
  };

  const sortCategories = () => {
    setCategoriesData([
      ...categoriesData.sort((a: any, b: any) => {
        return a.category_id - b.category_id;
      }),
    ]);
  };

  useEffect(() => {
    getCategories();
    setLoading(false);
    //console.log(categoriesData[0].category_name);
    //sortCategories();
  }, []);

  const onBackAction = () => {};

  return (
    <View>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Kategoriler" style={styles.appbar_text} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}>
        {categoriesData.map((item: any) => {
          return (
            <List.Item
              style={styles.items}
              titleStyle={{fontSize: width*0.05, marginVertical: 5}}
              title={item.category_name}
              key={item.category_id}
              onPress={() => {
                console.log(item.category_id);
                navigation.navigate('CategorizedBookScreen', {
                  category_id: item.category_id,
                  category_name: categoriesData[item.category_id - 1].category_name,
                });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
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
  items: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
});
