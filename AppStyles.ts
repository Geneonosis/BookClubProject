import React from 'react';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  customButton: {
    padding: 10,
    backgroundColor: '#8BB174',
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  customButtonCancel: {
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
});
