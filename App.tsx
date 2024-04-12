import React, {createContext, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  FlatList,
} from 'react-native';
import {styles} from './AppStyles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, Input} from 'react-native-elements';
import BookScreen from './components/BookScreen';

interface Book {
  title: string;
  author: string;
  genre: string;
  ISBN?: string;
}

interface LibraryContextType {
  library: Book[];
  setLibrary: React.Dispatch<React.SetStateAction<Book[]>>;
}

const LibraryContext = React.createContext<LibraryContextType | undefined>(
  undefined,
);

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
  return (
    <LibraryContext.Provider value={{library, setLibrary}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackNavigatorOptions}>
          <Stack.Screen name="Home">
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
                <Tab.Screen name="Library" component={LibraryScreen} />
                <Tab.Screen name="Book" component={BookScreen} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="NewBook" component={NewBookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LibraryContext.Provider>
  );
};

const LibraryScreen = ({navigation}: any) => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  const {library, setLibrary} = context;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Home Screen</Text>
      <Pressable
        style={styles.customButton}
        onPress={() => {
          //TODO: add a book
          console.log('Add a book');
          navigation.navigate('NewBook');
        }}>
        <Text>Add A Book</Text>
      </Pressable>
      <FlatList
        style={{width: '100%'}}
        data={library}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              //drop shadow
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              //android
              elevation: 5,
              margin: 5,
              padding: 10,
              borderRadius: 8,
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image
                source={{uri: 'https://via.placeholder.com/150'}}
                style={{width: 100, height: 150, borderRadius: 4}}
              />
              <View style={{margin: 10}}>
                <Icon name="book" size={24} color={'#8BB174'}></Icon>
                <Text>{item.title}</Text>
                <Icon name="person" size={24} color={'#8BB174'}></Icon>
                <Text>{item.author}</Text>
                <Icon name="pricetag" size={24} color={'#8BB174'}></Icon>
                <Text>{item.genre}</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  alignContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                <Pressable style={styles.customButton}>
                  <Icon name="bookmark" size={24} color={'white'}></Icon>
                </Pressable>
                <Pressable
                  style={styles.customButtonCancel}
                  onPress={() => {
                    //TODO: Remove a book from the library
                    console.log('Remove a book');
                    //remove the book from the library
                    const newLibrary = library.filter(
                      book => book.title !== item.title,
                    );
                    //create an alert to confirm the removal, before updating the library
                    Alert.alert(
                      'Remove Book',
                      'Are you sure you want to remove this book from your library?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            console.log('OK Pressed');
                            setLibrary(newLibrary);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Icon name="trash" size={24} color={'white'}></Icon>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const NewBookScreen = ({navigation}: any) => {
  const [book, setBook] = React.useState<Book>({
    title: '',
    author: '',
    genre: '',
  });

  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }

  const {library, setLibrary} = context;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={styles.safeArea}>
        <Text style={newBookStyles.headerText}>Add a new book</Text>
        <Input
          placeholder="Title *"
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, title: text});
          }}
        />
        <Input
          placeholder="Author *"
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, author: text});
          }}
        />
        <Input
          placeholder="Genre *"
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, genre: text});
          }}
        />
        <View style={newBookStyles.buttonContainer}>
          <Pressable
            style={styles.customButton}
            onPress={() => {
              //TODO: implement global state management to add a book
              //check if all fields are filled
              if (
                book.title === '' ||
                book.author === '' ||
                book.genre === ''
              ) {
                Alert.alert(
                  'Missing Fields',
                  'Please fill out all fields before adding a book.',
                  [{text: 'OK'}],
                  {cancelable: false},
                );
                return;
              }
              console.log('Add a book: ', book);
              setLibrary([...library, book]);
              //navigate to library
              navigation.navigate('Library');
            }}>
            <Text>Add Book</Text>
          </Pressable>
          <Pressable
            style={styles.customButtonCancel}
            onPress={() => {
              //navigate to library
              navigation.navigate('Library');
            }}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const newBookStyles: any = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textContainer: {
    padding: 5,
    paddingHorizontal: 15,
    margin: 3,
    borderRadius: 8,
    //drop shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    //android
    elevation: 5,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 0, // remove the border on both iOS and Android
  },
});

export default App;
