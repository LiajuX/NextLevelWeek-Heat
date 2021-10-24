import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors, fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 184,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom:  getBottomSpace() + 16,
    backgroundColor: colors.black_tertiary,
  },

  input: {
    width: '100%',
    height: 88,
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
});
