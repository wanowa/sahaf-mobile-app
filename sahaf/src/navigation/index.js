import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TabNavigator from './TabNavigator';
import BookScreen from '../screens/BookScreen';
import ProfileInformationsScreen from '../screens/ProfileInformationsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AddressSettingsScreen from '../screens/AddressSettingsScreen';
import SettingScreen from '../screens/SettingScreen';
import TakenBooksScreen from '../screens/TakenBooksScreen';
import GivenBooksScreen from '../screens/GivenBooksScreen';
import DemandsScreen from '../screens/DemandsScreen';
import DemandedsScreen from '../screens/DemandedsScreen';
import AddBookScreen from '../screens/AddBookScreen';
import CameraScreen from '../screens/CameraScreen';
import CategorizedBookScreen from '../screens/CategorizedBookScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ProfileInformationsScreen" component={ProfileInformationsScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="AddressSettingsScreen" component={AddressSettingsScreen} />
      <Stack.Screen name="TakenBooksScreen" component={TakenBooksScreen} />
      <Stack.Screen name="GivenBooksScreen" component={GivenBooksScreen} />
      <Stack.Screen name="DemandsScreen" component={DemandsScreen} />
      <Stack.Screen name="DemandedsScreen" component={DemandedsScreen} />
      <Stack.Screen name="AddBookScreen" component={AddBookScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="CategorizedBookScreen" component={CategorizedBookScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
