import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * props for the BookListItem MetaData Props
 */
interface BookListItemMetaDataProps {
  icon: string;
  labelText: string;
  color?: string;
  size?: number;
}

/**
 * @param icon - required input, needed to identify specific icon
 * @param labelText - required, needed for the ui exposed label
 * @param color - optional, to change the default color of the icon
 * @param size - optional, to change the size of the icon
 * @returns
 */
const BookListItemMetaData = ({
  icon,
  labelText,
  color = '#8BB174',
  size = 24,
}: BookListItemMetaDataProps) => {
  return (
    <View style={styles.dataContainer}>
      <Icon name={icon} size={size} color={color}></Icon>
      <Text style={styles.textData}>{labelText}</Text>
    </View>
  );
};

export default BookListItemMetaData;

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textData: {
    paddingLeft: 12,
    color: 'black',
  },
});
