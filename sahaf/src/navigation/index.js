import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MainScreen from '../screens/MainScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import LibraryScreen from '../screens/LibraryScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import AuthorizedScreens from '../screens/AuthorizedScreens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="AuthorizedScreens" component={AuthorizedScreens} /> */}
        <Stack.Screen name="Maincreen" component={TabNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="CategoriesScreen" component={TabNavigator} />
        <Stack.Screen name="LibraryScreen" component={TabNavigator} />
        <Stack.Screen name="FavouritesScreen" component={TabNavigator} />
        <Stack.Screen name="MyAccountScreen" component={TabNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
