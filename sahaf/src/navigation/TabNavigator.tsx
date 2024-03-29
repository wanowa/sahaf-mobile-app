import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainScreen from '../screens/MainScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import LibraryScreen from '../screens/LibraryScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const { width, height } = Dimensions.get('window')



const TabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="MainScreenTab"
        screenOptions={{
            tabBarStyle: {position: 'absolute', height: width*0.15},
            headerShown: false,
            tabBarActiveTintColor: '#25d6a2',
            tabBarLabelStyle: {fontSize: width*0.035},
            
        }}
    >
    <Tab.Screen
        name="MainScreenTab" 
        component={MainScreen}
        options={{
            tabBarLabel: 'Anasayfa',
            tabBarLabelStyle: {fontSize: width*0.035, marginBottom: 3},
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({color}) => (
                <Icon name='home-outline' color={color} size={width*0.1} />
            ),
        }}
    />
    <Tab.Screen
        name="CategoriesScreenTab"
        component={CategoriesScreen}
        options={{
            tabBarLabel: 'Kategoriler',
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: {fontSize: width*0.035, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='shape-outline' color={color} size={width*0.1} />
            ),
        }}
    />
    <Tab.Screen
        name="LibraryScreenTab"
        component={LibraryScreen}
        options={{
            tabBarLabel: 'Kitaplığım',
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: {fontSize: width*0.035, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='library' color={color} size={width*0.1} />
            ),
        }}
    />
    <Tab.Screen
        name="FavouritesScreenTab"
        component={FavouritesScreen}
        options={{
            tabBarLabel: 'Favorilerim',
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: {fontSize: width*0.035, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='heart-outline' color={color} size={width*0.1} />
            ),
        }}
    />
    <Tab.Screen
        name="MyAccountScreenTab"
        component={MyAccountScreen}
        options={{
            tabBarLabel: 'Hesabım',
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: {fontSize: width*0.035, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='account-outline' color={color} size={width*0.1} />
            ),
        }}
    />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
