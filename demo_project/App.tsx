import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BookScreen from './src/components/screens/BookScreen';
import {Book} from './src/interfaces/Book';
import NewBookScreen from './src/components/screens/NewBookScreen';
import LibraryScreen from './src/components/screens/LibraryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
