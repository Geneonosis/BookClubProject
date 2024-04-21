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

interface LibraryContextType {
  library: Book[];
  setLibrary: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const LibraryContext = React.createContext<
  LibraryContextType | undefined
>(undefined);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const stackNavigatorOptions = {
  headerStyle: {
    backgroundColor: '#8BB174',
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerTintColor: 'white',
};

const tabNavigatorOptions = {
  tabBarStyle: {
    backgroundColor: 'white',
    //drop shadow
    shadowColor: '#8BB174',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    //android
    elevation: 5,
  },
  tabBarActiveTintColor: '#8BB174',
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold' as 'bold',
  },
  headerStyle: {
    backgroundColor: '#8BB174',
  },
};

const App = () => {
  const [library, setLibrary] = React.useState<Book[]>([]);
  // load the library from async storage
  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const storedLibrary = await AsyncStorage.getItem('library');
        if (storedLibrary !== null) {
          setLibrary(JSON.parse(storedLibrary));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadLibrary();
  }, []);

  //Save the library to async storage whenever it changes
  useEffect(() => {
    const saveLibrary = async () => {
      try {
        await AsyncStorage.setItem('library', JSON.stringify(library));
      } catch (error) {
        console.error(error);
      }
    };
    saveLibrary();
  }, [library]);

  return (
    <LibraryContext.Provider value={{library, setLibrary}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackNavigatorOptions}>
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {() => (
              <Tab.Navigator
                screenOptions={({route}) => ({
                  tabBarIcon: ({focused, color, size}) => {
                    let iconName = 'library';
                    let iconColor = focused ? '#8BB174' : 'black';
                    if (route.name === 'Library') {
                      iconName = focused ? 'library' : 'library-outline';
                    } else if (route.name === 'Book') {
                      iconName = focused ? 'book' : 'book-outline';
                    }
                    return (
                      <Icon name={iconName} size={24} color={iconColor}></Icon>
                    );
                  },
                  ...tabNavigatorOptions,
                })}>
                <Tab.Screen
                  name="Library"
                  component={LibraryScreen}
                  options={{headerTitleStyle: {color: 'white'}}}
                />
                <Tab.Screen
                  name="Book"
                  component={BookScreen}
                  options={{headerTitleStyle: {color: 'white'}}}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="NewBook" component={NewBookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LibraryContext.Provider>
  );
};

export default App;
