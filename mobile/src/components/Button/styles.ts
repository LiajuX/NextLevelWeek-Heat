import { StyleSheet } from 'react-native';

import { fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
  },

  icon: {
    marginRight: 12,
  },

  title: {
    fontSize: 14,
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
  },
});
