/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [bookLink, setBookLink] = React.useState({uri: "https://covers.openlibrary.org/b/isbn/9780385533225-M.jpg"});
  console.log(bookLink);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
      />
      <View style={styles.container}>
        <Image style={styles.imageContainer} source={bookLink} resizeMode="contain"></Image>
        <Text style={styles.textContainer}>Hello World! 👋</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    height: "50%",
    width: "60%",
    backgroundColor: "red"
  },
  textContainer: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: "bold"
  },
});

export default App;
