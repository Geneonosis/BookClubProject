import React, {useContext} from 'react';
import {LibraryContext} from '../../../App';
import {
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
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
      <Text>Home Screen</Text>
      <Pressable
        style={globalStyles.customButton}
        onPress={() => {
          navigation.navigate('NewBook');
        }}>
        <Text>Add A Book</Text>
      </Pressable>
      <FlatList
        style={styles.flastListContainer}
        data={library}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <BookListItem bookItem={item} />}
      />
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  flastListContainer: {
    width: '100%',
  },
});
