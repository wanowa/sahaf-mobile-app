import {StyleSheet, Text, View} from 'react-native';
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

const TabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
            tabBarStyle: {position: 'absolute', height: 60},
            headerShown: false,
            tabBarActiveTintColor: '#25d6a2',
            tabBarLabelStyle: {fontSize: 14},

        }}
    >
    <Tab.Screen
        name="MainScreen" 
        component={MainScreen}
        options={{
            tabBarLabel: 'Anasayfa',
            tabBarLabelStyle: {fontSize: 14, marginBottom: 3, position: 'absolute'},
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({color}) => (
                <Icon name='home-outline' color={color} size={40} />
            ),
        }}
    />
    <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
            tabBarLabel: 'Kategoriler',
            tabBarLabelStyle: {fontSize: 14, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='shape-outline' color={color} size={40} />
            ),
        }}
    />
    <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
            tabBarLabel: 'Kitaplığım',
            tabBarLabelStyle: {fontSize: 14, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='library' color={color} size={40} />
            ),
        }}
    />
    <Tab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
            tabBarLabel: 'Favorilerim',
            tabBarLabelStyle: {fontSize: 14, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='heart-outline' color={color} size={40} />
            ),
        }}
    />
    <Tab.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
            tabBarLabel: 'Hesabım',
            tabBarLabelStyle: {fontSize: 14, marginBottom: 3},
            tabBarIcon: ({color}) => (
                <Icon name='account-outline' color={color} size={40} />
            ),
        }}
    />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
