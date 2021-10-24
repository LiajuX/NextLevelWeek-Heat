import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingTop: getStatusBarHeight() + 17,
    backgroundColor: colors.black_secondary,
  }
});
