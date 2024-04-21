import React, {useContext} from 'react';
import {LibraryContext} from '../../../App';
import {
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {globalStyles} from '../../../AppStyles';
import BookListItem from '../../listItems/BookListItem/BookListItem';

const LibraryScreen = ({navigation}: any) => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  const {library, setLibrary} = context;

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.newBookButtonContainer}>
        <Pressable
          style={globalStyles.customButton}
          onPress={() => {
            navigation.navigate('NewBook');
          }}>
          <Text>Add A Book</Text>
        </Pressable>
      </View>
      {library.length === 0 ? (
        <Text>No books in library, Add a book to get started!</Text>
      ) : (
        <FlatList
          style={styles.flastListContainer}
          data={library}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <BookListItem bookItem={item} navigation={navigation} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  flastListContainer: {
    width: '100%',
  },
  newBookButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});
