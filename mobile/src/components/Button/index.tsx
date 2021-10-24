import React from 'react';
import { 
  ActivityIndicator,
  ColorValue, 
  Text, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({ 
  title,
  color,
  backgroundColor, 
  icon,
  isLoading = false, 
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]}
      activeOpacity={0.85}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? <ActivityIndicator color={color} size={24} /> : 
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />

          <Text style={[styles.title, { color }]}>
            { title }
          </Text>
        </>
      }
    </TouchableOpacity>
  );
}
