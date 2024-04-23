import React, {useContext} from 'react';
import {Book} from './../../interfaces/Book';
//import {LibraryContext} from '../../../App';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {globalStyles} from '../../../AppStyles';
import {Input} from 'react-native-elements';
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface NewBookScreenProps {
  route: RouteProp<any, 'NewBook'>;
  navigation: NavigationProp<any>;
}

const NewBookScreen = ({route, navigation}: NewBookScreenProps) => {
  const [book, setBook] = React.useState<Book>({
    title: route.params?.bookItem ? route.params.bookItem.title : '',
    author: route.params?.bookItem ? route.params.bookItem.author : '',
    genre: route.params?.bookItem ? route.params.bookItem.genre : '',
    focused: route.params?.bookItem ? route.params.bookItem.focused : false,
  });

  const bookEditMode = route.params?.bookItem ? true : false;
  const oldBook = route.params?.bookItem;

  console.log(bookEditMode);

  const showAlert = () => {
    Alert.alert(
      'Missing Fields',
      'Please fill out all fields before adding a book.',
      [{text: 'OK'}],
      {cancelable: false},
    );
  };

  /**
   * funciton that handles a new book entry
   * @returns nothing
   */
  const handleEditBook = () => {
    if (book.title === '' || book.author === '' || book.genre === '') {
      showAlert();
      return;
    }
    navigation.navigate('Library');
  };

  /**
   * function that handles a book being edited
   * @returns nothing
   */
  const handleNewBook = () => {
    if (book.title === '' || book.author === '' || book.genre === '') {
      showAlert();
      return;
    }
    navigation.navigate('Library');
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={globalStyles.safeArea}>
        <Text style={newBookStyles.headerText}>Add a new book</Text>
        <Input
          placeholder="Title *"
          value={book.title}
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, title: text});
          }}
        />
        <Input
          placeholder="Author *"
          value={book.author}
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, author: text});
          }}
        />
        <Input
          placeholder={'Genre *'}
          value={book.genre}
          placeholderTextColor={'#FF6347'}
          inputContainerStyle={newBookStyles.textContainer}
          underlineColorAndroid={'transparent'}
          onChangeText={text => {
            setBook({...book, genre: text});
          }}
        />
        <View style={newBookStyles.buttonContainer}>
          {bookEditMode ? (
            <Pressable
              style={globalStyles.customButton}
              onPress={() => {
                handleEditBook();
              }}>
              <Text>Edit Book</Text>
            </Pressable>
          ) : (
            <Pressable
              style={globalStyles.customButton}
              onPress={() => {
                handleNewBook();
              }}>
              <Text>Add Book</Text>
            </Pressable>
          )}
          <Pressable
            style={globalStyles.customButtonCancel}
            onPress={() => {
              //navigate to library
              navigation.goBack();
            }}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewBookScreen;

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
