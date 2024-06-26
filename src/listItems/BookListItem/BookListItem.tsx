import React, {useContext} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Book} from '../../interfaces/Book';
import {globalStyles} from '../../../AppStyles';
import {LibraryContext} from '../../../App';
import BookListItemMetaData from './BookListItemMetaData';

interface BookListItemProps {
  bookItem: Book;
  navigation: any;
}

const BookListItem = ({bookItem, navigation}: BookListItemProps) => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  const {library, setLibrary} = context;

  const handleRemoveBook = (bookItem: Book) => {
    //TODO: Remove a book from the library
    console.log('Remove a book');
    //remove the book from the library using a filter and store the newLibrary state
    const newLibrary = library.filter(book => book.title !== bookItem.title);
    //create an alert to confirm the removal, before updating the library

    bookItem.focused = false;

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
  };

  const handleEditBook = (bookItem: Book) => {
    //TODO: should navigate to the book entry page with all the book stuff filled in and ready to edit
    navigation.navigate('NewBook', {bookItem});
  };

  const handleBookMark = (bookItem: Book) => {
    //if the user clicks on this toggle, it shoudl change the focused item from true to false, and if ANY OTHER BOOK
    // is set to focused it removes that focus.

    const newLibrary = library.map(book => {
      if (book === bookItem) {
        return {...book, focused: !book.focused};
      } else {
        return {...book, focused: false};
      }
    });

    setLibrary(newLibrary);
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={styles.imageContainer}
        />
        <View style={styles.dataContainer}>
          <BookListItemMetaData icon="book" labelText={bookItem.title} />
          <BookListItemMetaData icon="person" labelText={bookItem.author} />
          <BookListItemMetaData icon="pricetag" labelText={bookItem.genre} />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={globalStyles.customButton}
            onPress={() => {
              handleBookMark(bookItem);
            }}>
            <Icon
              name={bookItem.focused ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={'white'}></Icon>
          </Pressable>
          <Pressable
            style={globalStyles.customEditButton}
            onPress={() => {
              handleEditBook(bookItem);
            }}>
            <Icon name="pencil" size={24} color={'white'}></Icon>
          </Pressable>
          <Pressable
            style={globalStyles.customButtonCancel}
            onPress={() => {
              handleRemoveBook(bookItem);
            }}>
            <Icon name="trash" size={24} color={'white'}></Icon>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BookListItem;

const styles = StyleSheet.create({
  container: {
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
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  dataContainer: {
    margin: 10,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'white',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});
