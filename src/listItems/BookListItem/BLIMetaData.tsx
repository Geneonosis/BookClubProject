import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * props for the BookListItem MetaData Props
 */
interface BLIMetaDataProps {
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
const BLIMetaData = ({
  icon,
  labelText,
  color = '#8BB174',
  size = 24,
}: BLIMetaDataProps) => {
  return (
    <>
      <Icon name={icon} size={size} color={color}></Icon>
      <Text>{labelText}</Text>
    </>
  );
};

export default BLIMetaData;
