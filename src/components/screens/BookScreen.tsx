import React from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';
import {globalStyles} from '../../../AppStyles';

const BookScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Text>Add a book to your library to get started!</Text>
      <Pressable
        style={globalStyles.customButton}
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
