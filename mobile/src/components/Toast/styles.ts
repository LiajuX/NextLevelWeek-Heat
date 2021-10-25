import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    top: 150,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },

  title: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
});
