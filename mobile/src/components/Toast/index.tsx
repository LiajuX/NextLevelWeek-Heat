import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';

import { colors } from '../../theme';

import { styles } from './styles';

type ToastProps = {
  title: string;
  type: 'success' | 'warning';
  isVisible: boolean;
} 

const typeColor = {
  success: colors.green,
  warning: colors.orange,
}

export function Toast({ title, type, isVisible }: ToastProps) {
  const cardOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
    }
  });

  function showToast() {
    cardOpacity.value = withTiming(
      1,
      { duration: 1000 }
    );
  }

  function hideToast() {
    cardOpacity.value = withTiming(
      0,
      { duration: 1500 }
    );
  }

  const backgroundColor = typeColor[type];

  if (isVisible) {
    showToast();
    setTimeout(hideToast, 1500);
  }

  return (
    <Animated.View 
      style={[animatedStyle, styles.container, { backgroundColor }]}
    >
      <Text style={styles.title}>{ title }</Text>
    </Animated.View>
  );
}
