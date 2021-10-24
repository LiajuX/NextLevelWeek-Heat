import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 36,
  },

  message: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 24,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },

  userName: {
    marginLeft: 16,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
});
