/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
import StackNavigator from './StackNavigator';

function App() {
  
  return (
    <>
      <StackNavigator/>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  }
});

export default App;
