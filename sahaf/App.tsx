import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
import TabNavigator from './src/navigation/TabNavigator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeId } from './src/actions/id';


const App: () => any = () => {
  let isAuthenticated = false;
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
