import React from 'react';
import {SafeAreaView, Text, Pressable, View, StyleSheet} from 'react-native';
import {globalStyles} from '../../../AppStyles';
import {useContext} from 'react';
//import {LibraryContext} from '../../../App';
import {Image} from 'react-native-elements';

const BookScreen = ({navigation}: any) => {
  const handleNoBooksInLibrary = () => {
    return (
      <>
        <Text>Add a book to your library to get started!</Text>
        <Pressable
          style={globalStyles.customButton}
          onPress={() => {
            navigation.navigate('Library');
          }}>
          <Text>Take Me To My Library</Text>
        </Pressable>
      </>
    );
  };

  const handleBookDisplay = () => {
    return (
      <>
        <View style={styles.bookContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>TITLE: </Text>
          <Text>AUTHOR: </Text>
          <Text>GENRE: </Text>
          <Text>Placeholder description text</Text>
        </View>
      </>
    );
  };

  return <SafeAreaView style={globalStyles.safeArea}></SafeAreaView>;
};

export default BookScreen;

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
});
