import React from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';
import {styles} from '../AppStyles';

const BookScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Add a book to your library to get started!</Text>
      <Pressable
        style={styles.customButton}
        onPress={() => {
          //navigate to library
          navigation.navigate('Library');
        }}>
        <Text>Take Me To My Library</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default BookScreen;
