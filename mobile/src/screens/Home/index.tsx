import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';
import { SignInBox } from '../../components/SignInBox';

import { styles } from './styles';

export function Home(){
  const { user } = useAuth();

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Header />

        <MessageList />
        
        { user ? <SendMessageForm /> : <SignInBox /> }
      </View>
    </KeyboardAvoidingView>
  );
}
