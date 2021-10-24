import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../Button';

import { colors } from '../../theme';

import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button 
        title="Entrar com github" 
        icon="github" 
        color={colors.black_primary}
        backgroundColor={colors.yellow}
        isLoading={isSigningIn}
        onPress={signIn}
      />
    </View>
  );
}
