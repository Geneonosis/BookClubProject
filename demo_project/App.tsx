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

//TODO: create the library context interface here

//TODO: export the library context here, use React.createContext

//TODO: - NAV - Create a stack navigator and tab navigator here

//TODO: create stack navigator options and tab navigator options here

const App = () => {
  //TODO: Set up state management here for controlling library state

  //TODO: set up use effects for asyncronous storage here
  return (
    <>
      {/*TODO: set up Library Context / Provider here */}
      {/*TODO: set up Navigation container here*/}
      {/*TODO: set up the stack navigator here*/}
      {/*TODO: set up the tab navigator here*/}
      <View>
        <Text>App</Text>
      </View>
    </>
  );
};

export default App;
