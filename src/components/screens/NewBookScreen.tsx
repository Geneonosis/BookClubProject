import React, {useContext} from 'react';
import {Book} from './../../interfaces/Book';
import {LibraryContext} from '../../../App';
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
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={globalStyles.safeArea}>
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
            style={globalStyles.customButton}
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
            style={globalStyles.customButtonCancel}
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
