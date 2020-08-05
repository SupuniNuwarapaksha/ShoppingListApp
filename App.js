import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GettingStarted from './src/screens/gettingStarted';
import MainStackNavigator from './src/navigations/mainStackNavigator'

export default function App() {
  return (
    <MainStackNavigator />
  );
}

